import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { resolveClientDist } from './static/client-dist';

// Load persisted Hostinger env (not stripped like .env) before Nest boot.
loadEnv({ path: join(__dirname, 'hostinger.runtime.env') });
loadEnv({ path: join(__dirname, '.env') });
loadEnv({ path: join(__dirname, '..', '.env') });
loadEnv({ path: join(process.cwd(), 'server', '.env') });

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log(
    `Env check: NODE_ENV=${process.env.NODE_ENV ?? 'unset'} PORT=${process.env.PORT ?? 'unset'} DB=${process.env.DATABASE_URL ? 'set' : 'missing'}`,
  );

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const apiPrefix = config.get<string>('app.apiPrefix', 'api');
  const port = Number(process.env.PORT) || config.get<number>('app.port', 4000);
  const nodeEnv = config.get<string>('app.nodeEnv', 'development');

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  const clientDist = resolveClientDist();
  if (nodeEnv === 'production' && clientDist) {
    app.useStaticAssets(clientDist, { index: false });
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      const path = req.path;
      if (path.startsWith(`/${apiPrefix}`) || path.startsWith('/uploads')) return next();
      if (path.includes('.')) return next();
      res.sendFile(join(clientDist, 'index.html'));
    });
    logger.log(`Serving frontend from ${clientDist}`);
  } else if (nodeEnv === 'production') {
    logger.warn('client/dist not found — API only mode');
  }

  await app.listen(port, () => {
    logger.log(`LeafyLand listening on port ${port} (API: /${apiPrefix})`);
  });
}

bootstrap().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[Bootstrap] Failed to start:', message);
  process.exit(1);
});
