# Hostinger — set ONCE, never change again

| Setting | Value |
|---------|--------|
| **Output directory** | `release` |
| **Entry file** | `app.js` |
| **Build command** | `npm run build` |
| **Install command** | `npm install` |
| **Framework** | Other |
| **Node** | 22.x |

`release/app.js` is committed to Git — Hostinger always uses this entry.
`npm run build` fills `release/` with `dist/` (full NestJS build), `public/`, `node_modules/`, env.

## Environment variables (one-time per site)

```powershell
npm run hostinger-import
```

hPanel → Environment variables → Import → `deploy/hostinger-import.env`

Required: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_ANON_KEY`

Do **not** set `PORT`.

## Troubleshooting

- **503** → Runtime logs (sidebar). Look for `[app] DATABASE_URL= MISSING`
- **Build failed but logs OK** → confirm Output=`release`, Entry=`app.js`
- **Authentication failed against database server** → `DATABASE_URL` password is wrong or mangled in hPanel
  1. Supabase → **Project Settings** → **Database** → reset password if needed
  2. Copy **Connection string** → **URI** (Transaction pooler, port **6543**) → `DATABASE_URL`
  3. Copy **Direct connection** (port **5432**) → `DIRECT_URL`
  4. If the password has `@`, `#`, `%`, etc., [URL-encode](https://www.urlencoder.org/) the password only
  5. Locally: `npm run hostinger-import` then `node scripts/verify-database-url.mjs`
  6. hPanel → **Environment variables** → delete old `DATABASE_URL` / `DIRECT_URL` → import fresh `deploy/hostinger-import.env` → **Redeploy**
