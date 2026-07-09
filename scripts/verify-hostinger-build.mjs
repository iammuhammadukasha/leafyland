import { existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const dist = join(root, 'server', 'dist');
const checks = [
  ['server/dist/main.js', join(dist, 'main.js')],
  ['server/dist/app.js', join(dist, 'app.js')],
  ['server/dist/package.json', join(dist, 'package.json')],
  ['server/dist/public/index.html', join(dist, 'public', 'index.html')],
  ['server/dist/env.config.js', join(dist, 'env.config.js')],
  ['server/dist/node_modules', join(dist, 'node_modules')],
];

for (const [label, path] of checks) {
  if (!existsSync(path)) {
    console.error(`verify-build: missing ${label}`);
    process.exit(1);
  }
}

console.log('verify-build: server/dist runtime package OK');
