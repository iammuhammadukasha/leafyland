import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingStatus } from '../common/enums';

export class CreateBookingDto {
  @IsString()
  serviceId!: string;

  @IsString()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;

  @IsString()
  bookingDate!: string;

  @IsString()
  timeSlot!: string;

  @IsString()
  addressLine1!: string;

  @IsString()
  city!: string;

  @IsString()
  pincode!: string;
}

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status!: BookingStatus;

  @IsOptional()
  @IsString()
  razorpayPaymentId?: string;
}

export class CreateBookingPaymentDto {
  @IsString()
  bookingId!: string;
}

export class VerifyBookingPaymentDto {
  @IsString()
  bookingId!: string;

  @IsString()
  razorpayOrderId!: string;

  @IsString()
  razorpayPaymentId!: string;

  @IsString()
  razorpaySignature!: string;
}
