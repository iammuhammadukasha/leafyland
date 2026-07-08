import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductImportController } from './product-import.controller';
import { ProductsService } from './products.service';
import { ProductImportService } from './product-import.service';

@Module({
  controllers: [ProductImportController, ProductsController],
  providers: [ProductsService, ProductImportService],
  exports: [ProductsService],
})
export class ProductsModule {}
