import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../common/utils';
import { CreateServiceDto, UpdateServiceDto } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  findAll(status?: PublishStatus) {
    return this.prisma.service.findMany({
      where: status ? { status } : { status: PublishStatus.PUBLISHED },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({ where: { slug } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: { ...dto, slug: slugify(dto.name) },
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.prisma.service.findUniqueOrThrow({ where: { id } });
    return this.prisma.service.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.name ? { slug: slugify(dto.name) } : {}),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
