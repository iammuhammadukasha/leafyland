/** Generate a single .env file for Hostinger hPanel → Import .env (run locally). */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const serverEnv = join(root, 'server', '.env');
const clientEnv = join(root, 'client', '.env');
const outDir = join(root, 'deploy');
const outFile = join(outDir, 'hostinger-import.env');

if (!existsSync(serverEnv)) {
  console.error('generate-hostinger-import: server/.env not found');
  process.exit(1);
}

const lines = new Set();
for (const file of [serverEnv, clientEnv]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    if (trimmed.includes('=')) lines.add(trimmed);
  }
}

// Ensure production defaults for Hostinger
const map = Object.fromEntries(
  [...lines].map((line) => {
    const i = line.indexOf('=');
    return [line.slice(0, i), line.slice(i + 1)];
  }),
);

map.NODE_ENV = 'production';
delete map.PORT; // Hostinger assigns PORT — do not import
if (!map.VITE_SUPABASE_URL && map.SUPABASE_URL) {
  map.VITE_SUPABASE_URL = map.SUPABASE_URL;
}

const output = Object.entries(map)
  .map(([k, v]) => `${k}=${v}`)
  .join('\n');

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

writeFileSync(outFile, `${output}\n`, 'utf8');
console.log(`generate-hostinger-import: wrote ${outFile}`);
console.log('Import this file in hPanel → Environment variables → Import .env');
