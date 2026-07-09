# Hostinger settings — copy EXACTLY

**Deployments → Settings and redeploy**

| Field | Value |
|-------|--------|
| Framework | **Other** |
| Node.js | **22.x** |
| Root directory | `.` |
| Install command | `npm install` |
| Build command | `npm run build` |
| **Start command** | `npm start` |
| **Output directory** | `server/dist` |
| **Entry file** | `start.js` |

## Environment variables

Import once per site: `deploy/hostinger-import.env`  
Generate: `npm run hostinger-import` from repo root.

**Do not set PORT** in env vars.

## After deploy shows "Completed"

1. Open https://paleturquoise-trout-180752.hostingersite.com
2. API test: https://paleturquoise-trout-180752.hostingersite.com/api/health
3. If 503 → **Runtime logs** (sidebar) and paste errors

## Why server/dist?

Hostinger copies only the **output directory** to the Node runtime.  
`server/dist` now includes `node_modules`, `start.js`, `main.js`, and `public/`.
