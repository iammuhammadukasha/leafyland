/**
 * Pack server/dist as a standalone Node app for Hostinger (output directory = server/dist).
 * Installs production node_modules inside dist so runtime does not need server/node_modules.
 */
import { execSync } from 'child_process';
import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const distDir = join(root, 'server', 'dist');
const serverPkgPath = join(root, 'server', 'package.json');

if (!existsSync(join(distDir, 'main.js'))) {
  console.error('hostinger-pack: missing server/dist/main.js');
  process.exit(1);
}

const serverPkg = JSON.parse(readFileSync(serverPkgPath, 'utf8'));

writeFileSync(
  join(distDir, 'package.json'),
  `${JSON.stringify(
    {
      name: 'leafyland-runtime',
      private: true,
      main: 'start.js',
      scripts: { start: 'node start.js' },
      dependencies: serverPkg.dependencies,
    },
    null,
    2,
  )}\n`,
);

writeFileSync(
  join(distDir, 'start.js'),
  `'use strict';
const fs = require('fs');
const path = require('path');

function applyEnv(obj) {
  for (const [key, value] of Object.entries(obj || {})) {
    if (value != null && process.env[key] === undefined) {
      process.env[key] = String(value);
    }
  }
}

if (fs.existsSync(path.join(__dirname, 'env.config.js'))) {
  applyEnv(require('./env.config.js'));
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
if (!process.env.API_PREFIX) process.env.API_PREFIX = 'api';
if (!process.env.APP_VERSION) process.env.APP_VERSION = '0.1.0';

console.log('[start] cwd=', process.cwd());
console.log('[start] PORT=', process.env.PORT ?? 'unset');
console.log('[start] DATABASE_URL=', process.env.DATABASE_URL ? 'set' : 'MISSING');

require('reflect-metadata');
require('./main.js');
`,
);

const prismaSrc = join(root, 'server', 'prisma');
const prismaDst = join(distDir, 'prisma');
if (existsSync(prismaSrc)) {
  cpSync(prismaSrc, prismaDst, { recursive: true });
}

console.log('hostinger-pack: npm install in server/dist...');
execSync('npm install --omit=dev', { cwd: distDir, stdio: 'inherit' });

console.log('hostinger-pack: prisma generate in server/dist...');
execSync('npx prisma generate', { cwd: distDir, stdio: 'inherit' });

console.log('hostinger-pack: ready — use output server/dist, entry start.js');
