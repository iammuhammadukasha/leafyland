import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleInit() {
    void this.$connect().catch((err) => {
      console.error('[Prisma] Database connect failed — API will be degraded:', err);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
