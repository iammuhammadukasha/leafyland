import { existsSync } from 'fs';
import { join } from 'path';

/** Resolve Vite build output whether cwd is repo root or server/. */
export function resolveClientDist(): string | null {
  const candidates = [
    join(__dirname, 'public'),
    join(process.cwd(), 'release', 'public'),
    join(process.cwd(), 'server', 'dist', 'public'),
    join(process.cwd(), 'client', 'dist'),
    join(process.cwd(), '..', 'client', 'dist'),
    join(__dirname, '..', '..', '..', 'client', 'dist'),
    join(__dirname, '..', '..', 'client', 'dist'),
  ];

  for (const dir of candidates) {
    if (existsSync(join(dir, 'index.html'))) return dir;
  }
  return null;
}
