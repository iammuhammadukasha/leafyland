import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryType } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../common/utils';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll(type?: CategoryType, parentId?: string | null, rootsOnly?: boolean) {
    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (rootsOnly) where.parentId = null;
    else if (parentId !== undefined) where.parentId = parentId;

    return this.prisma.category.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        _count: { select: { products: true, children: true } },
        parent: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async findTree(type?: CategoryType) {
    const roots = await this.prisma.category.findMany({
      where: { type: type ?? CategoryType.PRODUCT, parentId: null },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        _count: { select: { products: true } },
        children: {
          orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
          include: { _count: { select: { products: true } } },
        },
      },
    });
    return roots;
  }

  async findOne(id: string) {
    const cat = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: { orderBy: { name: 'asc' } },
        _count: { select: { products: true } },
      },
    });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async create(dto: CreateCategoryDto) {
    if (dto.parentId) {
      const parent = await this.findOne(dto.parentId);
      if (parent.parentId) {
        throw new BadRequestException('Subcategories can only be added under top-level categories');
      }
    }

    let slug = slugify(dto.name);
    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({ where: { id: dto.parentId } });
      slug = `${parent!.slug}-${slug}`;
    }

    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    return this.prisma.category.create({
      data: { ...dto, slug },
      include: { parent: { select: { id: true, name: true, slug: true } } },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.name ? { slug: slugify(dto.name) } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }

  async bulkRemove(ids: string[]) {
    if (ids.length === 0) return { deleted: 0 };

    let deleted = 0;
    for (const id of ids) {
      const cat = await this.findOne(id);
      const childIds = (cat.children ?? []).map((c) => c.id);
      const categoryIds = [id, ...childIds];

      await this.prisma.product.deleteMany({
        where: { categoryId: { in: categoryIds } },
      });

      if (childIds.length > 0) {
        await this.prisma.category.deleteMany({ where: { id: { in: childIds } } });
      }

      await this.prisma.category.delete({ where: { id } });
      deleted += 1;
    }

    return { deleted };
  }
}
