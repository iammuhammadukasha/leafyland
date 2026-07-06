# LeafyLand

Green ecosystem marketplace — React frontend + Node.js API.

## Stack

- **Client:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Server:** Node.js, Express

## Run locally

```bash
# Install all dependencies
npm install
cd client && npm install
cd ../server && npm install

# From repo root — client + API together
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:4000/api/health

## Build for production

```bash
cd client && npm run build
cd ../server && npm start
```

Server serves the built React app from `client/dist` and exposes `/api/*` routes.

## Design

- White background (`#FFFFFF`)
- Green headings & CTAs (`#1e5439`)
- Black body text (`#000000`)
- Zepto-style product cards, Urban Company-style service cards, multi-section homepage

## Project structure

```
client/src/
  components/layout/   Header, Footer, MobileBottomNav
  components/ui/       ProductCard, ServiceCard, VendorCard
  data/homeData.ts     All homepage content + Unsplash images
  pages/HomePage.tsx   All homepage sections
server/src/index.js    Express API + static serve
```
