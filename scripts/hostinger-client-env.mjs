/**
 * Writes client/.env for Vite from Hostinger/hPanel environment variables.
 * Run before `npm run build --prefix client` on deploy hosts that don't ship client/.env.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const clientEnvPath = join(root, 'client', '.env');

if (existsSync(clientEnvPath)) {
  console.log('hostinger-client-env: client/.env already exists — skipping');
  process.exit(0);
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error(
    'hostinger-client-env: missing VITE_SUPABASE_URL (or SUPABASE_URL) and/or VITE_SUPABASE_ANON_KEY',
  );
  process.exit(1);
}

const lines = [
  `VITE_SUPABASE_URL=${url}`,
  `VITE_SUPABASE_ANON_KEY=${anonKey}`,
  '',
];

writeFileSync(clientEnvPath, lines.join('\n'), 'utf8');
console.log(`hostinger-client-env: wrote ${clientEnvPath}`);
