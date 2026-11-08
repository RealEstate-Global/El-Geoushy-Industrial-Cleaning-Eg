# Monorepo

Two independently runnable applications, one repository:

| Folder | What it is | Stack |
| --- | --- | --- |
| `el-geoushy/` | The public storefront (frontend) | TanStack Start + React 19 + Vite + Tailwind CSS 4 |
| `backend/` | API and future admin surface | ASP.NET Core 9, Clean Architecture, EF Core (SQLite locally) |
| `docs/` | All project documentation | Markdown |
| `.github/` | CI workflows, Dependabot, issue and PR templates | YAML |

The frontend is intentionally self-contained: `el-geoushy/` holds its own
`package.json`, lockfile, TypeScript config, Vite config, tests, and public
assets. You can open that folder on its own and it runs. The backend is the same
idea: `backend/ElGeoushy.sln` restores and builds on its own.

## Quick start

### Frontend

Prerequisites: Node 22+ and pnpm (a `packageManager` pin in `el-geoushy/package.json`
means corepack handles the version: `corepack enable pnpm`).

```sh
cd el-geoushy
pnpm install
pnpm run dev        # http://localhost:8080
```

```sh
pnpm run typecheck  # tsc --noEmit
pnpm run lint       # eslint
pnpm run test       # vitest
pnpm run build      # production build -> .output/
pnpm run start      # serve the production build with Node
```

### Backend

Prerequisite: .NET 9 SDK.

```sh
cd backend
dotnet restore
dotnet build
dotnet test
dotnet run --project src/ElGeoushy.Api   # http://localhost:5080
```

Health check: <http://localhost:5080/health>. OpenAPI JSON (development):
<http://localhost:5080/openapi/v1.json>.

## Documentation index

Everything lives in [`docs/`](docs/README.md):

- [Architecture](docs/ARCHITECTURE.md)
- [Frontend guide](docs/FRONTEND.md)
- [Backend guide](docs/BACKEND.md)
- [API reference](docs/API.md)
- [Development setup](docs/DEVELOPMENT.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Error reporting](docs/ERROR_REPORTING.md)
- [Product north star](docs/PRODUCT_NORTH_STAR.md)
- [Removal of the hosted-platform build](docs/PLATFORM_REMOVAL.md)

Contributor rules: [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
Security policy: [SECURITY.md](SECURITY.md). Recent changes:
[CHANGELOG.md](CHANGELOG.md).
