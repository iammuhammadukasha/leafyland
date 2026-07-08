import { Module } from '@nestjs/common';
import { AdminController, VendorDashboardController } from './admin.controller';

@Module({
  controllers: [AdminController, VendorDashboardController],
})
export class AdminModule {}
