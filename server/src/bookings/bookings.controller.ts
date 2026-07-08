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
  CreateBookingDto,
  UpdateBookingStatusDto,
  VerifyBookingPaymentDto,
} from './bookings.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookings: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto, @Req() req: { user?: { id: string } }) {
    return this.bookings.create(dto, req.user?.id);
  }

  @Post(':id/pay')
  createPayment(@Param('id') id: string) {
    return this.bookings.createPayment(id);
  }

  @Post(':id/mock-pay')
  mockPay(@Param('id') id: string) {
    return this.bookings.mockPay(id);
  }

  @Post('verify-payment')
  verifyPayment(@Body() dto: VerifyBookingPaymentDto) {
    return this.bookings.verifyPayment(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.bookings.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
    return this.bookings.updateStatus(id, dto);
  }
}
