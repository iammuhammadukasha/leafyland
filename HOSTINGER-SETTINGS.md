# Hostinger — copy these EXACT settings

Go to **Websites → lavender-fox-532363 → Deployments → Settings and redeploy**

## Build settings

| Field | Value |
|-------|-------|
| Framework | **Other** (not Next.js) |
| Node.js version | **22.x** |
| Root directory | `.` |
| Install command | `npm install` |
| Build command | `npm run build` |
| **Start command** | `npm start` |
| Output directory | `.` |
| **Entry file** | `index.js` |

## Environment variables (required)

Click **Import .env** and upload:

```
deploy/hostinger-import.env
```

Generate it locally (once):

```powershell
cd C:\Users\Ukasha\repos\leafyland
npm run hostinger-import
```

Required keys:
- `NODE_ENV=production`
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do **not** set `PORT` — Hostinger assigns it automatically.

## After redeploy

- Site: https://lavender-fox-532363.hostingersite.com
- API: https://lavender-fox-532363.hostingersite.com/api/health

## If still failing

Open **Runtime logs** (not Build logs). Look for:
```
[index] DATABASE_URL= set
LeafyLand running on http://0.0.0.0:...
```
