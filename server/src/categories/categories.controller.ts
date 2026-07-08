import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryType, UserRole } from '../common/enums';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { CategoriesService } from './categories.service';
import { BulkDeleteDto, CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categories: CategoriesService) {}

  @Get()
  findAll(
    @Query('type') type?: CategoryType,
    @Query('parentId') parentId?: string,
    @Query('roots') roots?: string,
  ) {
    if (roots === 'true') {
      return this.categories.findAll(type, undefined, true);
    }
    if (parentId === 'null' || parentId === '') {
      return this.categories.findAll(type, null);
    }
    if (parentId) {
      return this.categories.findAll(type, parentId);
    }
    return this.categories.findAll(type);
  }

  @Get('tree')
  findTree(@Query('type') type?: CategoryType) {
    return this.categories.findTree(type);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('bulk-delete')
  bulkRemove(@Body() dto: BulkDeleteDto) {
    return this.categories.bulkRemove(dto.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categories.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categories.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categories.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categories.remove(id);
  }
}
