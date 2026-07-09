# Hostinger settings (no Start command field needed)

Hostinger only needs **Entry file** — it runs that file with Node automatically.

**Deployments → Settings and redeploy**

| Field | Value |
|-------|--------|
| Framework | **Other** |
| Node.js | **22.x** |
| Root directory | `.` |
| Install command | `npm install` |
| Build command | `npm run build` |
| **Output directory** | `server/dist` |
| **Entry file** | `app.js` |

There is **no separate Start command** on Hostinger — **Entry file = `app.js`** is how the app starts.

## Environment variables

Import once per site: `deploy/hostinger-import.env`  
Generate locally: `npm run hostinger-import`

**Do not set PORT** in env vars.

## After deploy shows "Completed"

1. https://paleturquoise-trout-180752.hostingersite.com
2. https://paleturquoise-trout-180752.hostingersite.com/api/health
3. Still 503? → **Runtime logs** in left sidebar
