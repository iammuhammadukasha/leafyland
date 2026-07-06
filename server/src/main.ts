import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const apiPrefix = config.get<string>('app.apiPrefix', 'api');
  const port = config.get<number>('app.port', 4000);
  const nodeEnv = config.get<string>('app.nodeEnv', 'development');
  const dbRequired = config.get<boolean>('database.required', true);

  app.setGlobalPrefix(apiPrefix);
  app.enableCors({
    origin: nodeEnv === 'production' ? false : true,
    credentials: true,
  });

  if (dbRequired) {
    const database = app.get(DatabaseService);
    const health = await database.ping();

    if (health.status !== 'connected') {
      logger.error(
        `PostgreSQL unavailable: ${health.error ?? 'connection failed'}`,
      );
      logger.error(
        'Start local DB with: docker compose up -d postgres (from repo root)',
      );
      process.exit(1);
    }

    logger.log(`PostgreSQL connected (${health.latencyMs}ms)`);
  }

  await app.listen(port);
  logger.log(`LeafyLand API running on http://localhost:${port}/${apiPrefix}`);
  logger.log(`Health: http://localhost:${port}/${apiPrefix}/health`);
  logger.log(`Version: http://localhost:${port}/${apiPrefix}/version`);
}

bootstrap();
