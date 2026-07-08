import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  @Get('health')
  async health() {
    let dbStatus = 'connected';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'disconnected';
    }

    return {
      status: dbStatus === 'connected' ? 'ok' : 'degraded',
      service: 'leafyland-api',
      timestamp: new Date().toISOString(),
      database: { status: dbStatus },
    };
  }

  @Get('version')
  version() {
    return {
      name: 'leafyland-api',
      version: this.config.get<string>('app.version', '0.1.0'),
      environment: this.config.get<string>('app.nodeEnv', 'development'),
      build: process.env.BUILD_SHA ?? null,
    };
  }
}
