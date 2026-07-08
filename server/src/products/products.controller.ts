import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PublishStatus, UserRole } from '../common/enums';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { BulkDeleteDto, CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('categorySlug') categorySlug?: string,
    @Query('subcategorySlug') subcategorySlug?: string,
    @Query('search') search?: string,
    @Query('status') status?: PublishStatus,
    @Query('vendorId') vendorId?: string,
  ) {
    return this.products.findAll({
      category,
      categorySlug,
      subcategorySlug,
      search,
      status,
      vendorId,
    });
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.products.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Post('bulk-delete')
  bulkRemove(@Body() dto: BulkDeleteDto, @Req() req: { user: never }) {
    return this.products.bulkRemove(dto.ids, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.products.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Post()
  create(@Body() dto: CreateProductDto, @Req() req: { user: never }) {
    return this.products.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: { user: never },
  ) {
    return this.products.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: never }) {
    return this.products.remove(id, req.user);
  }
}
