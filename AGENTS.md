# Agent and contributor rules

This repository is a monorepo with two runnable apps. Keep each app self-contained.

## Layout

- `el-geoushy/` — frontend (TanStack Start, React, Vite, Tailwind). All frontend
  config, source, tests, and assets belong here.
- `backend/` — ASP.NET Core Clean Architecture solution.
- `docs/` — long-form documentation. Update it when behavior or structure changes.
- `.github/` — CI and templates.
- Root — only cross-cutting files (README, AGENTS, CONTRIBUTING, SECURITY,
  .gitignore, .editorconfig).

## Frontend rules

- Business and contact data live **only** in `el-geoushy/src/shared/config/site.ts`.
  Catalog and FAQ content live in `el-geoushy/src/features/{catalog,faq}/data/`.
- A `null` config field must hide its UI. Never fabricate phone numbers, social
  links, or addresses.
- Routes are file-based under `el-geoushy/src/routes/` and stay thin wrappers
  (head/loader/route wiring only). Page and component code lives in
  `src/features/` and `src/shared/`. Do not introduce `src/pages/` or Next.js
  conventions. `routeTree.gen.ts` is generated.
- Package manager is pnpm (pinned via `packageManager` in
  `el-geoushy/package.json`). Do not reintroduce bun/node_modules.
- Error reporting is local only (`src/shared/lib/error-reporting.ts`). Do not add a
  hosted-platform SDK, wrapper config, or telemetry script.
- Run `pnpm run typecheck`, `pnpm run lint`, and `pnpm run test` before pushing.

## Backend rules

- Keep dependency direction inward:
  `Api -> Infrastructure -> Application -> Domain`.
  Domain references nothing. Application must not reference Infrastructure,
  ASP.NET Core, or a concrete DbContext implementation.
- Persistence is accessed through `IApplicationDbContext`. Endpoints stay thin:
  validate/bind, call an application handler, return a result.
- Add new features as a folder under `Application/Features/<Area>` with a
  request/command/query plus its handler, and register the handler in
  `Application/DependencyInjection.cs`.
- Local schema changes use `EnsureCreated` today. Before production, switch to
  EF Core migrations (`dotnet ef migrations add ...`).
- Run `dotnet build` and `dotnet test` before pushing.

## Secrets

Never commit secret values. Local settings belong in `appsettings.Development.json`,
user secrets, or environment variables. Frontend build-time variables must be
prefixed with `VITE_`, which means they are public by definition — never put
secrets there.
