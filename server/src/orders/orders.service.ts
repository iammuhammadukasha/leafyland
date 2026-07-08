import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderStatus, UserRole } from '../common/enums';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  VerifyOrderPaymentDto,
} from './orders.dto';

const GST_RATE = 0.18;

@Injectable()
export class OrdersService {
  private razorpay: Razorpay | null = null;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const keyId = config.get<string>('RAZORPAY_KEY_ID');
    const keySecret = config.get<string>('RAZORPAY_KEY_SECRET');
    if (keyId && keySecret) {
      this.razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }
  }

  async findAll(user?: { id: string; role: UserRole; vendor?: { id: string } }) {
    if (user?.role === UserRole.ADMIN) {
      return this.prisma.order.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      });
    }
    if (user?.role === UserRole.VENDOR && user.vendor) {
      return this.prisma.order.findMany({
        where: {
          items: { some: { product: { vendorId: user.vendor.id } } },
        },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      });
    }
    if (user?.role === UserRole.CUSTOMER) {
      return this.prisma.order.findMany({
        where: { customerId: user.id },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
    }
    return [];
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  private async calcShipping(pincode: string, subtotal: number) {
    const zones = await this.prisma.shippingZone.findMany();
    const match =
      zones.find((z) => pincode.startsWith(z.pinPrefix) && z.pinPrefix) ??
      zones.find((z) => z.isDefault);
    if (!match) return 99;
    if (match.freeAbove && subtotal >= match.freeAbove) return 0;
    return match.flatRate;
  }

  async create(dto: CreateOrderDto, customerId?: string) {
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    if (products.length !== productIds.length) {
      throw new BadRequestException('Invalid product in cart');
    }

    let subtotal = 0;
    const lineItems = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const shippingFee = await this.calcShipping(dto.pincode, subtotal);
    const gstAmount = Math.round(subtotal * GST_RATE * 100) / 100;
    const total = Math.round((subtotal + shippingFee + gstAmount) * 100) / 100;
    const orderNumber = `LL${Date.now()}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        city: dto.city,
        state: dto.state ?? '',
        pincode: dto.pincode,
        subtotal,
        shippingFee,
        gstAmount,
        total,
        status: OrderStatus.PENDING,
        items: { create: lineItems },
      },
      include: { items: true },
    });

    return order;
  }

  async createPayment(orderId: string) {
    const order = await this.findOne(orderId);
    if (!this.razorpay) {
      return {
        orderId: order.id,
        mock: true,
        amount: order.total,
        message: 'Razorpay not configured — use mock payment endpoint',
      };
    }

    const rzOrder = await this.razorpay.orders.create({
      amount: Math.round(order.total * 100),
      currency: 'INR',
      receipt: order.orderNumber,
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { razorpayOrderId: rzOrder.id },
    });

    return {
      orderId: order.id,
      razorpayOrderId: rzOrder.id,
      amount: order.total,
      keyId: this.config.get('RAZORPAY_KEY_ID'),
    };
  }

  async mockPay(orderId: string) {
    const order = await this.findOne(orderId);
    for (const item of order.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID, razorpayPaymentId: 'mock_payment' },
      include: { items: true },
    });
  }

  async verifyPayment(dto: VerifyOrderPaymentDto) {
    const secret = this.config.get<string>('RAZORPAY_KEY_SECRET', '');
    const body = `${dto.razorpayOrderId}|${dto.razorpayPaymentId}`;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expected !== dto.razorpaySignature) {
      throw new BadRequestException('Invalid payment signature');
    }

    const order = await this.findOne(dto.orderId);
    for (const item of order.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return this.prisma.order.update({
      where: { id: dto.orderId },
      data: {
        status: OrderStatus.PAID,
        razorpayPaymentId: dto.razorpayPaymentId,
      },
      include: { items: true },
    });
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: { items: true },
    });
  }

  getInvoice(order: Awaited<ReturnType<OrdersService['findOne']>>) {
    return {
      orderNumber: order.orderNumber,
      date: order.createdAt,
      customer: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: `${order.addressLine1}, ${order.city} ${order.pincode}`,
      },
      items: order.items.map((i) => ({
        name: i.name,
        qty: i.quantity,
        price: i.price,
        total: i.price * i.quantity,
      })),
      subtotal: order.subtotal,
      shipping: order.shippingFee,
      gst: order.gstAmount,
      total: order.total,
      gstin: this.config.get('GSTIN', 'GSTIN-PENDING'),
    };
  }
}
