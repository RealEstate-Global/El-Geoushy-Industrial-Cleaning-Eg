# Development

## Prerequisites

- Node.js 22+ (this repo was verified on Node 24)
- pnpm 12 (pinned via `packageManager` in `el-geoushy/package.json`; activate
  with `corepack enable pnpm`)
- .NET 9 SDK
- Git

## First-time setup

```sh
# Frontend
cd el-geoushy
pnpm install

# Backend
cd ../backend
dotnet restore
```

## Run both apps

Terminal 1:

```sh
cd el-geoushy
pnpm run dev
```

Terminal 2:

```sh
cd backend
dotnet run --project src/ElGeoushy.Api
```

- Frontend: <http://localhost:8080>
- Backend: <http://localhost:5080>
- Health: <http://localhost:5080/health>

The API allows browser origins `http://localhost:8080`, `http://localhost:5173`,
and `http://localhost:3000` by default. Add your own under
`Cors:AllowedOrigins` in `backend/src/ElGeoushy.Api/appsettings.json`.

## Verification before a pull request

```sh
cd el-geoushy
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build

cd ../backend
dotnet build
dotnet test
```

## Connecting the frontend to the API

The storefront currently reads static data. To use the API:

1. Add a data-access module under `el-geoushy/src/shared/lib/` (or a feature's
   `lib/`) that fetches `/api/products` and `/api/categories`.
2. Map the API DTOs to the existing `Product`/`Category` types in
   `src/features/catalog/data/catalog.ts`.
3. Point requests at the API base URL through a `VITE_` variable (for example
   `VITE_API_BASE_URL`) or a Vite dev proxy.

Keep `src/shared/config/site.ts` as the only source of business/contact details.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Port 8080 in use | Vite picks the next free port; read the terminal output |
| CORS error | Add the frontend origin to `Cors:AllowedOrigins` |
| API 500 on first run | Delete `backend/elgeoushy.db` and restart to re-seed |
| Frontend build cannot find `src/server.ts` | Keep `server: { entry: "server" }` in `vite.config.ts` |
| Lint fails on formatting | Run `pnpm run format` inside `el-geoushy/` |
