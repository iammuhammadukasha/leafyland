import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BookingStatus } from '../common/enums';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookingDto,
  UpdateBookingStatusDto,
  VerifyBookingPaymentDto,
} from './bookings.dto';

@Injectable()
export class BookingsService {
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

  findAll() {
    return this.prisma.serviceBooking.findMany({
      include: { service: true, customer: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateBookingDto, customerId?: string) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    return this.prisma.serviceBooking.create({
      data: {
        ...dto,
        customerId,
        amount: service.price,
        status: BookingStatus.PENDING,
      },
      include: { service: true },
    });
  }

  async createPayment(bookingId: string) {
    const booking = await this.prisma.serviceBooking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (!this.razorpay) {
      return {
        bookingId: booking.id,
        mock: true,
        amount: booking.amount,
        message: 'Use mock-pay endpoint',
      };
    }

    const order = await this.razorpay.orders.create({
      amount: Math.round(booking.amount * 100),
      currency: 'INR',
      receipt: `booking_${booking.id}`,
    });

    await this.prisma.serviceBooking.update({
      where: { id: bookingId },
      data: { razorpayOrderId: order.id },
    });

    return {
      bookingId: booking.id,
      razorpayOrderId: order.id,
      amount: booking.amount,
      keyId: this.config.get('RAZORPAY_KEY_ID'),
    };
  }

  async mockPay(bookingId: string) {
    return this.prisma.serviceBooking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        razorpayPaymentId: 'mock_payment',
      },
      include: { service: true },
    });
  }

  async verifyPayment(dto: VerifyBookingPaymentDto) {
    const secret = this.config.get<string>('RAZORPAY_KEY_SECRET', '');
    const body = `${dto.razorpayOrderId}|${dto.razorpayPaymentId}`;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expected !== dto.razorpaySignature) {
      throw new BadRequestException('Invalid payment signature');
    }

    return this.prisma.serviceBooking.update({
      where: { id: dto.bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        razorpayPaymentId: dto.razorpayPaymentId,
      },
      include: { service: true },
    });
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    return this.prisma.serviceBooking.update({
      where: { id },
      data: dto,
      include: { service: true },
    });
  }
}
