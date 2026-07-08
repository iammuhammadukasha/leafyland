/**
 * Finalize Hostinger deploy: bake env into dist + startup helpers.
 */
import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const serverEnv = join(root, 'server', '.env');
const distDir = join(root, 'server', 'dist');
const runtimeEnv = join(distDir, 'hostinger.runtime.env');
const envConfigJs = join(distDir, 'env.config.js');

if (!existsSync(join(distDir, 'main.js'))) {
  console.error('hostinger-finalize: server/dist/main.js missing — run server build first');
  process.exit(1);
}

const envObj = {};
const serverKeys = [
  'NODE_ENV', 'API_PREFIX', 'APP_VERSION', 'DATABASE_URL', 'DIRECT_URL',
  'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_STORAGE_BUCKET',
  'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'GSTIN',
];

if (existsSync(serverEnv)) {
  for (const line of readFileSync(serverEnv, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq);
    if (key === 'PORT') continue;
    envObj[key] = trimmed.slice(eq + 1);
  }
  writeFileSync(runtimeEnv, readEnvWithoutPort(serverEnv), 'utf8');
  console.log(`hostinger-finalize: wrote ${runtimeEnv}`);
} else {
  for (const key of serverKeys) {
    if (process.env[key]) envObj[key] = process.env[key];
  }
}

writeFileSync(
  envConfigJs,
  `'use strict';
module.exports = ${JSON.stringify(envObj, null, 2)};
`,
  'utf8',
);
console.log(`hostinger-finalize: wrote ${envConfigJs}`);

// Prisma schema for runtime (if needed by tooling).
const prismaDir = join(root, 'server', 'prisma');
const distPrisma = join(distDir, 'prisma');
if (existsSync(prismaDir)) {
  cpSync(prismaDir, distPrisma, { recursive: true });
  console.log('hostinger-finalize: copied server/prisma → server/dist/prisma');
}

function readEnvWithoutPort(filePath) {
  const lines = [];
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('PORT=')) continue;
    lines.push(trimmed);
  }
  return `${lines.join('\n')}\n`;
}
