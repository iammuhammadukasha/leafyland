import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../common/enums';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  VerifyOrderPaymentDto,
} from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req: { user?: { id: string } }) {
    return this.orders.create(dto, req.user?.id);
  }

  @Post(':id/pay')
  createPayment(@Param('id') id: string) {
    return this.orders.createPayment(id);
  }

  @Post(':id/mock-pay')
  mockPay(@Param('id') id: string) {
    return this.orders.mockPay(id);
  }

  @Post('verify-payment')
  verifyPayment(@Body() dto: VerifyOrderPaymentDto) {
    return this.orders.verifyPayment(dto);
  }

  @Get(':id/invoice')
  async invoice(@Param('id') id: string) {
    const order = await this.orders.findOne(id);
    return this.orders.getInvoice(order);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: { user: never }) {
    return this.orders.findAll(req.user);
  }

  @Get('track/:id')
  track(@Param('id') id: string) {
    return this.orders.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orders.updateStatus(id, dto);
  }
}
