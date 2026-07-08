import { existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const checks = [
  ['client/dist/index.html', join(root, 'client', 'dist', 'index.html')],
  ['server/dist/main.js', join(root, 'server', 'dist', 'main.js')],
];

for (const [label, path] of checks) {
  if (!existsSync(path)) {
    console.error(`verify-build: missing ${label} (${path})`);
    process.exit(1);
  }
}

console.log('verify-build: client/dist and server/dist/main.js OK');
