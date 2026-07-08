/** Copy client/dist into server/dist/public so Hostinger only needs server/dist output. */
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const clientDist = join(root, 'client', 'dist');
const target = join(root, 'server', 'dist', 'public');

if (!existsSync(join(clientDist, 'index.html'))) {
  console.error('bundle-client: missing client/dist/index.html — run client build first');
  process.exit(1);
}

if (existsSync(target)) rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(clientDist, target, { recursive: true });
console.log(`bundle-client: copied client/dist → server/dist/public`);
