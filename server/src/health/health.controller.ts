import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';

@Controller()
export class HealthController {
  constructor(
    private readonly database: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  @Get('health')
  async health() {
    const db = await this.database.ping();
    const status = db.status === 'connected' ? 'ok' : 'degraded';

    return {
      status,
      service: 'leafyland-api',
      timestamp: new Date().toISOString(),
      database: db,
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
