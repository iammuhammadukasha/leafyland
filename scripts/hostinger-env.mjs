/**
 * Writes client/.env and server/.env from hPanel environment variables at build time.
 * Hostinger injects env vars during build; persisting them ensures runtime can load server/.env
 * even when the process cwd is the repo root (node server/dist/main.js).
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const clientEnvPath = join(root, 'client', '.env');
const serverEnvPath = join(root, 'server', '.env');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.error(
    'hostinger-env: missing VITE_SUPABASE_URL (or SUPABASE_URL) and/or VITE_SUPABASE_ANON_KEY',
  );
  process.exit(1);
}

if (!existsSync(clientEnvPath)) {
  writeFileSync(
    clientEnvPath,
    [`VITE_SUPABASE_URL=${supabaseUrl}`, `VITE_SUPABASE_ANON_KEY=${anonKey}`, ''].join('\n'),
    'utf8',
  );
  console.log(`hostinger-env: wrote ${clientEnvPath}`);
} else {
  console.log('hostinger-env: client/.env already exists — skipping');
}

const serverKeys = [
  'NODE_ENV',
  'API_PREFIX',
  'APP_VERSION',
  'DATABASE_URL',
  'DIRECT_URL',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_STORAGE_BUCKET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'GSTIN',
];

const defaults = {
  NODE_ENV: 'production',
  API_PREFIX: 'api',
  APP_VERSION: '0.1.0',
  SUPABASE_STORAGE_BUCKET: 'product-images',
  SUPABASE_URL: supabaseUrl,
};

const serverLines = [];
for (const key of serverKeys) {
  const value = process.env[key] ?? defaults[key];
  if (value) serverLines.push(`${key}=${value}`);
}

const required = ['DATABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(
    `hostinger-env: missing required hPanel variables: ${missing.join(', ')}. Add them under Environment variables and redeploy.`,
  );
  process.exit(1);
}

writeFileSync(serverEnvPath, `${serverLines.join('\n')}\n`, 'utf8');
console.log(`hostinger-env: wrote ${serverEnvPath}`);
