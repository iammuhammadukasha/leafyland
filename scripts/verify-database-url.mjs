/**
 * Test DATABASE_URL from server/.env (password is never printed).
 * Run: node scripts/verify-database-url.mjs
 */
import { createRequire } from 'module';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const require = createRequire(join(process.cwd(), 'server', 'package.json'));
const pg = require('pg');

const envPath = join(process.cwd(), 'server', '.env');
if (!existsSync(envPath)) {
  console.error('verify-database-url: server/.env not found');
  process.exit(1);
}

let databaseUrl = '';
for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith('DATABASE_URL=')) {
    databaseUrl = trimmed.slice('DATABASE_URL='.length);
    break;
  }
}

if (!databaseUrl) {
  console.error('verify-database-url: DATABASE_URL missing in server/.env');
  process.exit(1);
}

let host = '(unknown)';
try {
  host = new URL(databaseUrl).host;
} catch {
  console.error('verify-database-url: DATABASE_URL is not a valid URL');
  process.exit(1);
}

console.log(`verify-database-url: testing ${host} ...`);
console.log(`verify-database-url: user=${new URL(databaseUrl).username}`);

const dbUser = new URL(databaseUrl).username;
if (host.includes('pooler.supabase.com') && dbUser === 'postgres') {
  console.error(
    'verify-database-url: pooler URL must use postgres.YOUR_PROJECT_REF as username, not "postgres"',
  );
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10_000,
});

try {
  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
  console.log('verify-database-url: OK — credentials work');
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error('verify-database-url: FAILED —', message);
  console.error('');
  console.error('Fix in Supabase → Project Settings → Database:');
  console.error('  1. Reset database password if unsure');
  console.error('  2. Copy URI (Transaction pooler, port 6543) for DATABASE_URL');
  console.error('  3. Copy Direct connection (port 5432) for DIRECT_URL');
  console.error('  4. URL-encode special characters in the password');
  console.error('  5. Re-import deploy/hostinger-import.env in hPanel');
  process.exit(1);
} finally {
  await pool.end();
}
