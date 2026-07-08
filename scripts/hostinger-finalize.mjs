/**
 * Finalize Hostinger deploy: bundle runtime env + startup entry inside server/dist.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const serverEnv = join(root, 'server', '.env');
const distDir = join(root, 'server', 'dist');
const runtimeEnv = join(distDir, 'hostinger.runtime.env');
const distEntry = join(distDir, 'start-hostinger.js');

if (!existsSync(join(distDir, 'main.js'))) {
  console.error('hostinger-finalize: server/dist/main.js missing — run server build first');
  process.exit(1);
}

if (existsSync(serverEnv)) {
  const raw = readEnvWithoutPort(serverEnv);
  writeFileSync(runtimeEnv, raw, 'utf8');
  console.log(`hostinger-finalize: wrote ${runtimeEnv}`);
} else {
  console.warn('hostinger-finalize: server/.env not found — relying on hPanel runtime env vars');
}

writeFileSync(
  distEntry,
  `'use strict';
const path = require('path');
const { config } = require('dotenv');

config({ path: path.join(__dirname, 'hostinger.runtime.env') });
require('./main.js');
`,
  'utf8',
);
console.log(`hostinger-finalize: wrote ${distEntry}`);

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
