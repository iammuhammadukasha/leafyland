# Supabase Setup — LeafyLand (Full Stack)

## 1. Create Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. **New project** → name: `leafyland` → set database password → region (Singapore/Mumbai if available)
3. Wait for project to finish provisioning

---

## 2. Get credentials

### API keys (Settings → API)

| Key | Use |
|-----|-----|
| **Project URL** | `SUPABASE_URL` + `VITE_SUPABASE_URL` |
| **anon public** | `VITE_SUPABASE_ANON_KEY` (client only) |
| **service_role** | `SUPABASE_SERVICE_ROLE_KEY` (server only — secret) |

### Database (Settings → Database → Connection string)

| Variable | Connection type |
|----------|-----------------|
| `DATABASE_URL` | **Transaction pooler** (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | **Session mode / Direct** (port 5432) |

---

## 3. Configure env files

### `server/.env` (copy from `server/.env.example`)

```env
DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
SUPABASE_URL=https://[ref].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_STORAGE_BUCKET=product-images
```

### `client/.env` (copy from `client/.env.example`)

```env
VITE_SUPABASE_URL=https://[ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## 4. Storage bucket

In Supabase → **SQL Editor**, run:

```
supabase/storage-policies.sql
```

Or manually: Storage → New bucket → `product-images` → **Public**

---

## 5. Auth settings

Supabase → **Authentication → Providers → Email**

- Enable Email provider
- For MVP: disable **Confirm email** (or users must verify before login)

---

## 6. Push database schema & seed

```powershell
cd server
npx prisma db push
npm run db:seed
```

This creates:
- Admin: `admin@leafyland.com` / `admin123`
- Vendor: `vendor@leafyland.com` / `vendor123`
- Demo categories, products, services

---

## 7. Run locally

```powershell
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Login at http://localhost:5173/login

---

## 8. Production (Railway + Vercel)

**Railway (API):** set all `server/.env` variables. Use **pooler** `DATABASE_URL`.

**Vercel (client):** set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

**Supabase Auth:** add your Vercel URL to Authentication → URL Configuration → Redirect URLs.

---

## Architecture

```
Client (Vite)  →  Supabase Auth (login/signup)
       ↓ access_token
NestJS API     →  validates token via Supabase
       ↓
Prisma         →  Supabase PostgreSQL
Upload API     →  Supabase Storage (product-images bucket)
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Profile not synced` | Call login again; client auto-calls `/api/auth/sync` |
| Prisma migrate fails | Use `DIRECT_URL` for `db push`, pooler for runtime |
| Upload fails | Run `storage-policies.sql`; check bucket name |
| Email confirm required | Disable in Supabase Auth or confirm email first |
