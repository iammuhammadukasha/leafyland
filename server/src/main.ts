import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { resolveClientDist } from './static/client-dist';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const apiPrefix = config.get<string>('app.apiPrefix', 'api');
  const port = config.get<number>('app.port', 4000);
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

  await app.listen(port, '0.0.0.0');
  logger.log(`LeafyLand running on http://0.0.0.0:${port} (API: /${apiPrefix})`);
}

bootstrap();
