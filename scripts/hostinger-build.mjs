/**
 * Hostinger production build — assembles everything into release/ (output directory).
 * Hostinger settings (set once, never change):
 *   Output directory: release
 *   Entry file: app.js
 *   Build command: npm run build
 */
import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const release = join(root, 'release');
const serverDist = join(root, 'server', 'dist');
const clientDist = join(root, 'client', 'dist');
const serverPkg = JSON.parse(readFileSync(join(root, 'server', 'package.json'), 'utf8'));

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

// 1) Env files for Vite + server build
run('node scripts/hostinger-env.mjs');

// 2) Compile client + server
run('npm run build --prefix client');
run('npm run db:generate --prefix server');
run('npm run build --prefix server');

if (!existsSync(join(serverDist, 'main.js'))) {
  console.error('hostinger-build: server/dist/main.js missing');
  process.exit(1);
}
if (!existsSync(join(clientDist, 'index.html'))) {
  console.error('hostinger-build: client/dist missing');
  process.exit(1);
}

// 3) Assemble release/ (keep committed release/app.js)
for (const name of ['main.js', 'public', 'node_modules', 'package.json', 'package-lock.json', 'env.config.js', 'prisma']) {
  const p = join(release, name);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

cpSync(join(serverDist, 'main.js'), join(release, 'main.js'));
cpSync(clientDist, join(release, 'public'), { recursive: true });
cpSync(join(root, 'server', 'prisma'), join(release, 'prisma'), { recursive: true });

// 4) Bake env from server/.env written by hostinger-env.mjs
const envObj = {};
const serverEnvPath = join(root, 'server', '.env');
if (existsSync(serverEnvPath)) {
  for (const line of readFileSync(serverEnvPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const key = t.slice(0, eq);
    if (key === 'PORT') continue;
    envObj[key] = t.slice(eq + 1);
  }
}
writeFileSync(
  join(release, 'env.config.js'),
  `'use strict';\nmodule.exports = ${JSON.stringify(envObj, null, 2)};\n`,
);

// 5) Runtime package.json + install deps inside release/
writeFileSync(
  join(release, 'package.json'),
  `${JSON.stringify(
    {
      name: 'leafyland-release',
      private: true,
      main: 'app.js',
      scripts: { start: 'node app.js' },
      dependencies: serverPkg.dependencies,
    },
    null,
    2,
  )}\n`,
);

run('npm install --omit=dev', { cwd: release });
run('npx prisma generate', { cwd: release });

mkdirSync(join(release, 'uploads'), { recursive: true });

// 6) Verify
const required = ['app.js', 'main.js', 'public/index.html', 'env.config.js', 'node_modules'];
for (const rel of required) {
  if (!existsSync(join(release, ...rel.split('/')))) {
    console.error(`hostinger-build: missing release/${rel}`);
    process.exit(1);
  }
}

console.log('hostinger-build: OK → output=release, entry=app.js');
