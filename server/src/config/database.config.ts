import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const url = process.env.DATABASE_URL;

  if (url) {
    return {
      url,
      ssl: process.env.DATABASE_SSL === 'true',
      required: process.env.DATABASE_REQUIRED !== 'false',
    };
  }

  return {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER ?? 'leafyland',
    password: process.env.DATABASE_PASSWORD ?? 'leafyland',
    database: process.env.DATABASE_NAME ?? 'leafyland',
    ssl: process.env.DATABASE_SSL === 'true',
    required: process.env.DATABASE_REQUIRED !== 'false',
  };
});
