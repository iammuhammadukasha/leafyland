'use strict';
/**
 * PERMANENT Hostinger entry — do not change Entry file in hPanel (always app.js).
 * Build populates main.js, public/, node_modules/, env.config.js in this folder.
 */
const fs = require('fs');
const path = require('path');

function applyEnv() {
  const envPath = path.join(__dirname, 'env.config.js');
  if (!fs.existsSync(envPath)) return;
  const env = require(envPath);
  for (const [key, value] of Object.entries(env)) {
    if (value != null && process.env[key] === undefined) {
      process.env[key] = String(value);
    }
  }
}

applyEnv();

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
if (!process.env.API_PREFIX) process.env.API_PREFIX = 'api';
if (!process.env.APP_VERSION) process.env.APP_VERSION = '0.1.0';

const mainJs = path.join(__dirname, 'main.js');
if (!fs.existsSync(mainJs)) {
  console.error('[app] main.js missing — run: npm run build');
  process.exit(1);
}

console.log('[app] LeafyLand starting at', new Date().toISOString());
console.log('[app] cwd=', process.cwd());
console.log('[app] PORT=', process.env.PORT ?? 'unset');
console.log('[app] DATABASE_URL=', process.env.DATABASE_URL ? 'set' : 'MISSING');
console.log('[app] SUPABASE_URL=', process.env.SUPABASE_URL ? 'set' : 'MISSING');

process.on('uncaughtException', (err) => {
  console.error('[app] uncaughtException:', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('[app] unhandledRejection:', err);
  process.exit(1);
});

try {
  console.log('[app] loading NestJS main.js...');
  require('reflect-metadata');
  require(mainJs);
  console.log('[app] main.js loaded');
} catch (err) {
  console.error('[app] boot failed:', err);
  process.exit(1);
}
