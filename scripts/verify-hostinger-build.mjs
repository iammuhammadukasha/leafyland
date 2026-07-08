import { existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const checks = [
  ['client/dist/index.html', join(root, 'client', 'dist', 'index.html')],
  ['server/dist/main.js', join(root, 'server', 'dist', 'main.js')],
  ['server/dist/public/index.html', join(root, 'server', 'dist', 'public', 'index.html')],
  ['server/dist/start-hostinger.js', join(root, 'server', 'dist', 'start-hostinger.js')],
  ['index.js', join(root, 'index.js')],
];

for (const [label, path] of checks) {
  if (!existsSync(path)) {
    console.error(`verify-build: missing ${label} (${path})`);
    process.exit(1);
  }
}

console.log('verify-build: client/dist, server/dist/main.js, server/dist/public OK');
