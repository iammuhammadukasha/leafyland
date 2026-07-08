import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryType, PublishStatus } from '../common/enums';
import { parseCsv, PRODUCT_IMPORT_TEMPLATE } from '../common/csv';
import { slugify, serializeImages } from '../common/utils';
import { PrismaService } from '../prisma/prisma.service';

export type ImportRowResult = { row: number; name: string; action: 'created' | 'updated' | 'skipped' };
export type ImportError = { row: number; message: string };

@Injectable()
export class ProductImportService {
  constructor(private prisma: PrismaService) {}

  getTemplate(): string {
    return PRODUCT_IMPORT_TEMPLATE;
  }

  async importFromCsv(csvText: string) {
    const rows = parseCsv(csvText);
    if (rows.length === 0) {
      throw new BadRequestException('CSV is empty or missing data rows');
    }

    const results: ImportRowResult[] = [];
    const errors: ImportError[] = [];

    for (let i = 0; i < rows.length; i++) {
      const rowNum = i + 2;
      const row = rows[i];
      try {
        const result = await this.importRow(row, rowNum);
        results.push(result);
      } catch (e) {
        errors.push({
          row: rowNum,
          message: e instanceof Error ? e.message : 'Import failed',
        });
      }
    }

    return {
      total: rows.length,
      created: results.filter((r) => r.action === 'created').length,
      updated: results.filter((r) => r.action === 'updated').length,
      results,
      errors,
    };
  }

  private async importRow(row: Record<string, string>, rowNum: number): Promise<ImportRowResult> {
    const name = row.name?.trim();
    const categoryName = row.category?.trim();
    const subcategoryName = row.subcategory?.trim();

    if (!name) throw new Error('name is required');
    if (!categoryName) throw new Error('category is required');
    if (!subcategoryName) throw new Error('subcategory is required');

    const price = Number(row.price);
    if (!Number.isFinite(price) || price < 0) throw new Error('price must be a valid number');

    const comparePrice = row.compare_price?.trim()
      ? Number(row.compare_price)
      : undefined;
    if (comparePrice !== undefined && (!Number.isFinite(comparePrice) || comparePrice < 0)) {
      throw new Error('compare_price must be a valid number');
    }

    const stock = row.stock?.trim() ? Number(row.stock) : 0;
    if (!Number.isInteger(stock) || stock < 0) throw new Error('stock must be a non-negative integer');

    const status = (row.status?.trim().toUpperCase() || PublishStatus.PUBLISHED) as PublishStatus;
    if (!Object.values(PublishStatus).includes(status)) {
      throw new Error(`status must be DRAFT or PUBLISHED`);
    }

    const parent = await this.resolveCategory(categoryName, null);
    const subcategory = await this.resolveCategory(subcategoryName, parent.id);

    const slug = slugify(name);
    const images = row.image_url?.trim() ? serializeImages([row.image_url.trim()]) : '[]';

    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (existing) {
      await this.prisma.product.update({
        where: { id: existing.id },
        data: {
          name,
          description: row.description?.trim() || name,
          price,
          comparePrice: comparePrice ?? null,
          stock,
          unit: row.unit?.trim() || null,
          categoryId: subcategory.id,
          status,
          images,
        },
      });
      return { row: rowNum, name, action: 'updated' };
    }

    await this.prisma.product.create({
      data: {
        name,
        slug,
        description: row.description?.trim() || name,
        price,
        comparePrice: comparePrice ?? null,
        stock,
        unit: row.unit?.trim() || null,
        categoryId: subcategory.id,
        status,
        images,
      },
    });
    return { row: rowNum, name, action: 'created' };
  }

  private async resolveCategory(name: string, parentId: string | null) {
    const normalized = name.toLowerCase();
    const existing = await this.prisma.category.findFirst({
      where: {
        parentId,
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { slug: normalized },
        ],
      },
    });
    if (existing) return existing;

    let slug = parentId
      ? `${(await this.prisma.category.findUnique({ where: { id: parentId } }))!.slug}-${slugify(name)}`
      : slugify(name);

    const clash = await this.prisma.category.findUnique({ where: { slug } });
    if (clash) slug = `${slug}-${Date.now()}`;

    return this.prisma.category.create({
      data: {
        name,
        slug,
        type: CategoryType.PRODUCT,
        parentId,
        sortOrder: 0,
      },
    });
  }
}
