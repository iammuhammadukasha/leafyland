'use strict';
/**
 * Hostinger entry point — loads baked env, fixes module paths, boots NestJS.
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');

const root = __dirname;
const serverDir = path.join(root, 'server');
const distDir = path.join(serverDir, 'dist');
const mainJs = path.join(distDir, 'main.js');

function applyEnv(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value != null && process.env[key] === undefined) {
      process.env[key] = String(value);
    }
  }
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq);
    if (key === 'PORT') continue;
    const value = trimmed.slice(eq + 1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

// Baked at build time from hPanel env (most reliable on Hostinger).
const envConfigJs = path.join(distDir, 'env.config.js');
if (fs.existsSync(envConfigJs)) {
  applyEnv(require(envConfigJs));
}

loadEnvFile(path.join(distDir, 'hostinger.runtime.env'));
loadEnvFile(path.join(serverDir, '.env'));

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
if (!process.env.API_PREFIX) process.env.API_PREFIX = 'api';
if (!process.env.APP_VERSION) process.env.APP_VERSION = '0.1.0';

if (!fs.existsSync(mainJs)) {
  console.error('[index] Missing build output:', mainJs);
  process.exit(1);
}

// Resolve modules from server/node_modules and root/node_modules.
const paths = [
  path.join(serverDir, 'node_modules'),
  path.join(root, 'node_modules'),
];
process.env.NODE_PATH = [...paths, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
Module._initPaths();

console.log('[index] cwd=', process.cwd());
console.log('[index] server/node_modules=', fs.existsSync(paths[0]));
console.log('[index] root/node_modules=', fs.existsSync(paths[1]));
console.log('[index] DATABASE_URL=', process.env.DATABASE_URL ? 'set' : 'MISSING');
console.log('[index] PORT=', process.env.PORT ?? 'unset');

process.chdir(serverDir);

try {
  require('reflect-metadata');
  require(mainJs);
} catch (err) {
  console.error('[index] Failed to start:');
  console.error(err);
  process.exit(1);
}
