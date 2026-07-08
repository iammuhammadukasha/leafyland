# LeafyLand

India's green marketplace — plants, garden products, and bookable services.

**Live prototype reference:** [leafyland.shop](https://leafyland.shop/)

## Stack

| Layer | Tech |
|-------|------|
| **Client** | React 19, TypeScript, Vite, Tailwind CSS v4, React Router |
| **API** | NestJS, Prisma |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth (email/password) |
| **Storage** | Supabase Storage (`product-images` bucket) |
| **Payments** | Razorpay (mock fallback when keys unset) |

## Architecture

```
Browser (Vite)  →  Supabase Auth (login / signup)
       ↓ Bearer access_token
NestJS API      →  validates token via Supabase Admin
       ↓
Prisma          →  Supabase PostgreSQL
Upload API      →  Supabase Storage
```

## Quick start

### 1. Supabase project

Follow **[docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md)** to:

1. Create a Supabase project
2. Copy credentials into `server/.env` and `client/.env`
3. Run `supabase/storage-policies.sql` in the SQL Editor
4. Push schema and seed demo data

### 2. Install & run

```powershell
# From repo root
cd client && npm install
cd ../server && npm install

# Push DB schema (needs DIRECT_URL in server/.env)
cd server
npx prisma db push
npm run db:seed

# Run both apps
cd ..
npm run dev
```

- **Storefront:** http://localhost:5173  
- **API health:** http://localhost:4000/api/health  
- **Login:** http://localhost:5173/login  

### Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@leafyland.com` | `admin123` |
| Vendor | `vendor@leafyland.com` | `vendor123` |

## Project structure

```
client/src/          React storefront + admin/vendor dashboards
server/src/          NestJS API modules
server/prisma/       PostgreSQL schema (Prisma)
server/scripts/      Supabase seed script
supabase/            Storage SQL policies
docs/                Setup guides
```

## Build

```powershell
npm run build          # client + server
cd server && npm start # production API on :4000
```

## Env files

Copy examples and fill in your Supabase project values:

- `server/.env.example` → `server/.env`
- `client/.env.example` → `client/.env`
