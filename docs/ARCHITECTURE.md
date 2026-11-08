# Architecture

## Repository layout

```
.
├── el-geoushy/                 # Frontend application (self-contained)
│   ├── public/                 # Static assets served as-is
│   ├── src/
│   │   ├── shared/             # Cross-feature building blocks
│   │   │   ├── ui/             # shadcn/ui primitives
│   │   │   ├── components/     # Page sections (hero, headings, banners)
│   │   │   ├── config/site.ts  # The only source of business/contact data
│   │   │   ├── lib/            # utils, seo, motion, error capture/reporting
│   │   │   ├── hooks/
│   │   │   └── providers/      # theme
│   │   ├── features/           # Vertical slices (data, lib, components, pages)
│   │   │   ├── app-shell/      # Header, Footer, Logo, WhatsApp button
│   │   │   ├── marketing/      # Home and about pages
│   │   │   ├── catalog/
│   │   │   ├── faq/
│   │   │   ├── contact/
│   │   │   └── legal/
│   │   ├── routes/             # TanStack Start file-based routes (thin wrappers)
│   │   ├── router.tsx          # Router factory
│   │   ├── server.ts           # Custom SSR entry + error wrapper
│   │   └── start.ts            # Request/CSRF middleware
│   ├── package.json            # pnpm (`packageManager` pin)
│   ├── pnpm-workspace.yaml     # pnpm settings (overrides, build allowlist)
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── backend/                    # ASP.NET Core solution
│   ├── ElGeoushy.sln
│   ├── src/
│   │   ├── ElGeoushy.Domain/
│   │   ├── ElGeoushy.Application/
│   │   ├── ElGeoushy.Infrastructure/
│   │   └── ElGeoushy.Api/
│   └── tests/
│       ├── ElGeoushy.Domain.UnitTests/
│       └── ElGeoushy.Application.UnitTests/
├── docs/
└── .github/
```

## Why two folders

The frontend and backend have different toolchains, lockfiles, and release
cadences. Keeping them separate means:

- opening `el-geoushy/` alone is enough to develop the storefront;
- opening `backend/` alone is enough to build the API;
- CI can run only the affected side;
- neither toolchain can accidentally depend on the other's config.

There is no root `package.json` and no npm workspace. Install and run inside the
folder you are working on.

## Runtime data flow

1. The browser loads a TanStack Start page. Routes are server-rendered and then
   hydrated on the client.
2. Today, catalog and FAQ content come from static files in
   `el-geoushy/src/features/{catalog,faq}/data/`. Business and contact values
   come from `el-geoushy/src/shared/config/site.ts`.
3. The backend exposes the same catalog shape over HTTP:
   `GET /api/products`, `GET /api/products/{slug}`, `GET /api/categories`.
4. The frontend can switch from static data to the API later without changing
   page components: add a data-access module and map the API DTOs to the
   existing `Product`/`Category` types.
5. Runtime errors are logged locally. If `VITE_ERROR_REPORT_ENDPOINT` is set,
   they are also POSTed to the backend sink at `/api/client-errors`.

## Backend dependency rule

```
Api ──► Infrastructure ──► Application ──► Domain
```

- **Domain** — entities, invariants, domain exceptions. No dependencies.
- **Application** — use cases, DTOs, `IApplicationDbContext`. No ASP.NET Core,
  no EF Core provider, no Infrastructure reference.
- **Infrastructure** — EF Core `DbContext`, configurations, seeding, DI wiring.
- **Api** — minimal API endpoints, contracts, middleware, `Program.cs`.

Dependencies point inward only. A feature is added by creating a folder under
`Application/Features`, registering its handler, and mapping an endpoint.

## Configuration

- Frontend: `el-geoushy/src/shared/config/site.ts` is the single source of
  business data. `null` means "not verified yet" and the UI hides that element.
- Backend: `appsettings.json` plus environment variables. Connection string key
  is `ConnectionStrings:DefaultConnection`; allowed browser origins are
  `Cors:AllowedOrigins`.
- Secrets are never committed.
