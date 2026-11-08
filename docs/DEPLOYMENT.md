# Deployment

Both apps are plain, portable builds. There is no hosted-platform wrapper.

## Frontend

Build from `el-geoushy/`:

```sh
pnpm install --frozen-lockfile
pnpm run build
```

Output:

- `.output/public/` — static assets
- `.output/server/index.mjs` — Node server (Nitro `node-server` preset)

Run:

```sh
PORT=8080 node .output/server/index.mjs
```

Build-time configuration is limited to `VITE_*` variables (public). Set them in
the environment before `pnpm run build`. For example:

```sh
VITE_ERROR_REPORT_ENDPOINT=https://api.example.com/api/client-errors pnpm run build
```

Serve the app behind TLS. If you serve the API from the same origin (for example
under `/api`), no CORS configuration is needed.

## Backend

Publish from `backend/`:

```sh
dotnet publish src/ElGeoushy.Api/ElGeoushy.Api.csproj -c Release -o ./publish
```

Run:

```sh
ASPNETCORE_URLS=http://0.0.0.0:5080 \
ConnectionStrings__DefaultConnection="Data Source=/data/elgeoushy.db" \
dotnet ./publish/ElGeoushy.Api.dll
```

Production checklist:

- Set `ASPNETCORE_ENVIRONMENT=Production`.
- Supply a real database. SQLite is a development default; switch the provider
  in `Infrastructure/DependencyInjection.cs` and add migrations.
- Restrict `Cors:AllowedOrigins` to the deployed frontend origin.
- Put the API behind a reverse proxy with TLS.
- Protect `POST /api/products` with authentication before exposing it.
- Do not serve the `.db` file or `appsettings.Development.json`.

## CI

`.github/workflows/frontend.yml` and `.github/workflows/backend.yml` run on
pushes and pull requests that touch each folder. They run typecheck, lint, tests,
and builds. Keep both green.
