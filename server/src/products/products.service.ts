import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PublishStatus, UserRole } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { formatProduct, serializeImages, slugify } from '../common/utils';
import { CreateProductDto, UpdateProductDto } from './products.dto';

type AuthUser = {
  id: string;
  role: UserRole;
  vendor?: { id: string; approved: boolean } | null;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    category?: string;
    categorySlug?: string;
    subcategorySlug?: string;
    search?: string;
    status?: PublishStatus | 'ALL';
    vendorId?: string;
  }) {
    let categoryIds: string[] | undefined;

    if (params.category) {
      categoryIds = [params.category];
    } else if (params.subcategorySlug) {
      const sub = await this.prisma.category.findFirst({
        where: { slug: params.subcategorySlug },
      });
      if (sub) categoryIds = [sub.id];
      else categoryIds = [];
    } else if (params.categorySlug) {
      const parent = await this.prisma.category.findFirst({
        where: { slug: params.categorySlug, parentId: null },
        include: { children: { select: { id: true } } },
      });
      if (parent) {
        categoryIds = [parent.id, ...parent.children.map((c) => c.id)];
      } else {
        const cat = await this.prisma.category.findFirst({
          where: { slug: params.categorySlug },
        });
        categoryIds = cat ? [cat.id] : [];
      }
    }

    const products = await this.prisma.product.findMany({
      where: {
        ...(params.status && params.status !== 'ALL'
          ? { status: params.status }
          : params.status === 'ALL'
            ? {}
            : { status: PublishStatus.PUBLISHED }),
        ...(categoryIds ? { categoryId: { in: categoryIds } } : {}),
        ...(params.vendorId ? { vendorId: params.vendorId } : {}),
        ...(params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        category: { include: { parent: { select: { id: true, name: true, slug: true } } } },
        vendor: { select: { shopName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return products.map(formatProduct);
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { category: true, vendor: { select: { shopName: true } } },
    });
    if (!product) throw new NotFoundException('Product not found');
    return formatProduct(product);
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return formatProduct(product);
  }

  async create(dto: CreateProductDto, user: AuthUser) {
    const slug = slugify(dto.name);
    const vendorId =
      user.role === UserRole.VENDOR ? user.vendor?.id : undefined;

    if (user.role === UserRole.VENDOR && !user.vendor?.approved) {
      throw new ForbiddenException('Vendor not approved yet');
    }

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        price: dto.price,
        comparePrice: dto.comparePrice,
        stock: dto.stock ?? 0,
        categoryId: dto.categoryId,
        unit: dto.unit,
        status: dto.status ?? PublishStatus.DRAFT,
        images: serializeImages(dto.images ?? []),
        vendorId,
      },
      include: { category: true },
    });
    return formatProduct(product);
  }

  async update(id: string, dto: UpdateProductDto, user: AuthUser) {
    const product = await this.findOne(id);
    this.assertCanModify(product.vendorId, user);

    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        comparePrice: dto.comparePrice,
        stock: dto.stock,
        categoryId: dto.categoryId,
        unit: dto.unit,
        status: dto.status,
        ...(dto.name ? { slug: slugify(dto.name) } : {}),
        ...(dto.images ? { images: serializeImages(dto.images) } : {}),
      },
      include: { category: true },
    });
    return formatProduct(updated);
  }

  async remove(id: string, user: AuthUser) {
    const product = await this.findOne(id);
    this.assertCanModify(product.vendorId, user);
    return this.prisma.product.delete({ where: { id } });
  }

  async bulkRemove(ids: string[], user: AuthUser) {
    if (ids.length === 0) return { deleted: 0 };

    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true, vendorId: true },
    });

    for (const p of products) {
      this.assertCanModify(p.vendorId, user);
    }

    const result = await this.prisma.product.deleteMany({
      where: { id: { in: products.map((p) => p.id) } },
    });
    return { deleted: result.count };
  }

  private assertCanModify(vendorId: string | null, user: AuthUser) {
    if (user.role === UserRole.ADMIN) return;
    if (user.role === UserRole.VENDOR && vendorId === user.vendor?.id) return;
    throw new ForbiddenException('Not allowed');
  }
}
