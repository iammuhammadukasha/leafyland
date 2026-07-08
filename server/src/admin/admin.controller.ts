import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserRole } from '../common/enums';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('stats')
  async stats() {
    const [orders, products, services, bookings, vendors, users, revenue] =
      await Promise.all([
        this.prisma.order.count(),
        this.prisma.product.count(),
        this.prisma.service.count(),
        this.prisma.serviceBooking.count(),
        this.prisma.vendor.count(),
        this.prisma.user.count(),
        this.prisma.order.aggregate({
          where: { status: { not: 'CANCELLED' } },
          _sum: { total: true },
        }),
      ]);

    return {
      orders,
      products,
      services,
      bookings,
      vendors,
      users,
      revenue: revenue._sum.total ?? 0,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('users')
  users() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        vendor: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('vendors')
  vendors() {
    return this.prisma.vendor.findMany({
      include: { user: { select: { email: true, name: true } } },
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('vendors/:id/approve')
  approveVendor(@Param('id') id: string) {
    return this.prisma.vendor.update({
      where: { id },
      data: { approved: true },
    });
  }
}

@Controller('vendor')
export class VendorDashboardController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDOR)
  @Get('stats')
  async stats(@Req() req: { user: { vendor: { id: string } } }) {
    const vendorId = req.user.vendor.id;
    const [products, orders] = await Promise.all([
      this.prisma.product.count({ where: { vendorId } }),
      this.prisma.order.findMany({
        where: { items: { some: { product: { vendorId } } }, status: 'PAID' },
        include: { items: { where: { product: { vendorId } } } },
      }),
    ]);
    const earnings = orders.reduce(
      (sum, o) =>
        sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0),
      0,
    );
    return { products, orders: orders.length, earnings };
  }
}
