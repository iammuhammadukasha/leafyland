# Deploy LeafyLand on Hostinger (Business plan)

LeafyLand runs as **one Node.js app**: NestJS serves the API at `/api` and the React storefront from `client/dist`. **Supabase** stays your database and auth — no migration needed.

## Requirements

- Hostinger **Business Web Hosting** (or Cloud)
- Node.js **20.x** (supported on Business)
- GitHub repo **or** ZIP upload
- Supabase project (existing `DATABASE_URL`, keys)

## hPanel setup

### 1. Add website

1. **Websites** → **Add Website** → **Node.js Web App**
2. If a default site already uses your domain, remove it first (download a backup if needed).
3. Connect **GitHub** (recommended) or upload a **ZIP** of the repo (exclude `node_modules`, `.env`).

### 2. Build & start commands

If Hostinger does not auto-detect, use:

| Setting | Value |
|---------|--------|
| **Node.js version** | 22.x (or 20.x) |
| **Root directory** | `.` (repository root) |
| **Install command** | `npm install` (runs `postinstall` → installs `server/` + `client/` deps) |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |
| **Framework** | NestJS (if asked) |
| **Output directory** | `server/dist` |
| **Entry file** | `server/dist/main.js` (if asked) |

Equivalent scripts in `package.json`:

```bash
npm install              # postinstall → server + client (incl. TypeScript/Vite)
npm run build            # prisma generate, client env, build client + server
npm start                # node server/dist/main.js
```

### 3. Environment variables (one-time import)

**Required once** — the build writes `server/.env` from these at deploy time.

1. On your PC, from repo root: `npm run hostinger-import`  
   → creates `deploy/hostinger-import.env` (gitignored, contains your secrets)
2. In hPanel → **Environment variables** → **Import .env** → upload `deploy/hostinger-import.env`
3. Redeploy

Or add manually in hPanel (copy values from `server/.env` — **never commit `.env`**):

| Variable | Required | Example / notes |
|----------|----------|-----------------|
| `NODE_ENV` | Yes | `production` |
| `PORT` | Optional | Leave unset — Hostinger assigns this automatically. Only set if runtime logs show a port error. |
| `API_PREFIX` | Yes | `api` |
| `APP_VERSION` | Yes | `0.1.0` |
| `DATABASE_URL` | Yes | Supabase pooler URL (port 6543) |
| `DIRECT_URL` | Recommended | Supabase direct URL (port 5432) |
| `SUPABASE_URL` | Yes | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_URL` | Build | Same as `SUPABASE_URL` (or omit — build script copies from it) |
| `VITE_SUPABASE_ANON_KEY` | Build + runtime | Supabase **anon public** key (client auth; not service role) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key |
| `SUPABASE_STORAGE_BUCKET` | Optional | `product-images` |
| `RAZORPAY_KEY_ID` | Optional | For payments |
| `RAZORPAY_KEY_SECRET` | Optional | For payments |
| `GSTIN` | Optional | `GSTIN-PENDING` |

### 4. Domain

1. Test on the temporary URL first (e.g. `lavender-fox-532363.hostingersite.com`).
2. When **leafyland.com** transfer completes: **Websites** → **Domains** → attach `leafyland.com`.
3. Enable **Free SSL** (Let’s Encrypt) in hPanel.

### 5. Verify

- `https://your-domain.com/` — homepage loads
- `https://your-domain.com/products` — SPA routing works
- `https://your-domain.com/api/health` — API responds (if health route exists)
- Admin login: `admin@leafyland.com` / `admin123` (change after go-live)

## Local production test (optional)

```bash
# From repo root
npm run hostinger-build
cd server
# Set NODE_ENV=production and copy .env
npm run start:prod
```

Open `http://localhost:4000` — frontend and `/api` should both work.

## Architecture

```
Browser
   │
   ▼
Hostinger Node.js (single process)
   ├── /api/*     → NestJS API
   ├── /uploads/* → uploaded files
   └── /*         → client/dist (React SPA)
   
Supabase (external)
   ├── PostgreSQL (DATABASE_URL)
   └── Auth API
```

## Vercel vs Hostinger

You can keep [leafyland.vercel.app](https://leafyland.vercel.app) as a backup until Hostinger is stable. Point **DNS for leafyland.com** to Hostinger when ready.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Check build logs; ensure `client/dist/index.html` exists after build |
| API 404 | Confirm `API_PREFIX=api` and routes use `/api/...` |
| DB connection error | Verify `DATABASE_URL` uses Supabase **pooler** (6543) with `?pgbouncer=true` |
| `tsc: command not found` | Ensure latest code is deployed; root `postinstall` must install `client/` devDependencies |
| Build succeeds but deploy fails | App crashed on startup — open **Runtime logs** and check env vars below |
| Missing env vars at startup | Set `NODE_ENV`, `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` in hPanel |
| Domain not working | Wait for transfer; check DNS points to Hostinger |

## Seed database (one-time)

Run locally against production Supabase (with production `.env`):

```bash
npm run db:seed
```

Or use Supabase SQL / admin panel — do not run seed on every deploy.
