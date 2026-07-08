import { BadRequestException, Controller, Get, Header, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { UserRole } from '../common/enums';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { ProductImportService } from './product-import.service';

@Controller('products/import')
export class ProductImportController {
  constructor(private importer: ProductImportService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('template')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="leafyland-products-template.csv"')
  template() {
    return this.importer.getTemplate();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('CSV file is required');
    const text = file.buffer.toString('utf-8');
    return this.importer.importFromCsv(text);
  }
}
