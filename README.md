# NEW CETRiS

> **MVP is frontend-only. Admin edits are demo/local-browser data and are not secure or shared across devices. Backend is intentionally deferred.**

NEW CETRiS is a dedicated Arabic-first product website for a multi-purpose cleaner by **El-Gioushy Industrial Detergents**. This repository currently contains the public demo frontend and a preserved ASP.NET Core project for a later phase. The backend was not part of this MVP implementation.

## Run the frontend

Requires Node.js 22+ and pnpm 12 (pinned in `el-geoushy/package.json`).

```sh
cd el-geoushy
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The frontend is Next.js App Router with TypeScript. See [frontend setup](docs/FRONTEND_SETUP.md).

## Demo content and owner follow-up

- `/admin` edits sample data in this browser's `localStorage`; use **Reset demo data** to restore the seed.
- WhatsApp number `+0201016264326` is kept verbatim and marked unverified. Confirm it in E.164 format before enabling WhatsApp ordering.
- The Google Maps actions use a business/location search URL because no verified listing URL or Place ID was supplied. Confirm the listing and use a verified direct review URL when available.
- Four variant colors are provisional labels, not confirmed formulas or fragrances.
- No real NEW CETRiS product photos are currently in the frontend assets. The website marks this as a placeholder; supply approved product and variant images before production.

## Project layout

- `el-geoushy/` — sole frontend app (Next.js App Router).
- `backend/` — existing ASP.NET Core solution preserved for future integration; not connected to the MVP.
- `docs/` — setup, architecture, demo data, brand/content, deployment and future backend notes.

The public experience is exclusively for NEW CETRiS. The product offer shown in demo data is two bottles for EGP 100. No delivery terms, reviews, ratings, ingredients, certifications, or formula differences are implied.
