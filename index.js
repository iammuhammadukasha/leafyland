'use strict';
/**
 * Hostinger entry point (committed to git — not generated at build time).
 * Loads env, chdirs to server/, then boots NestJS from server/dist/main.js.
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const serverDir = path.join(root, 'server');
const distDir = path.join(serverDir, 'dist');
const mainJs = path.join(distDir, 'main.js');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(path.join(distDir, 'hostinger.runtime.env'));
loadEnvFile(path.join(serverDir, '.env'));
loadEnvFile(path.join(root, '.env'));

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
// Do NOT set PORT — Hostinger injects it. Wrong port = 503.
if (!process.env.API_PREFIX) process.env.API_PREFIX = 'api';
if (!process.env.APP_VERSION) process.env.APP_VERSION = '0.1.0';

if (!fs.existsSync(mainJs)) {
  console.error('[index] Missing build output:', mainJs);
  console.error('[index] Run: npm run build');
  process.exit(1);
}

console.log('[index] repo root=', root);
console.log('[index] server/node_modules=', fs.existsSync(path.join(serverDir, 'node_modules')));
console.log('[index] DATABASE_URL=', process.env.DATABASE_URL ? 'set' : 'MISSING');
console.log('[index] PORT=', process.env.PORT ?? '(Hostinger will inject)');

process.chdir(serverDir);

try {
  require(mainJs);
} catch (err) {
  console.error('[index] Failed to start NestJS:');
  console.error(err);
  process.exit(1);
}
