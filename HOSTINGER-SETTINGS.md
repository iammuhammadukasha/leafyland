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
`npm run build` fills `release/` with `main.js`, `public/`, `node_modules/`, env.

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
