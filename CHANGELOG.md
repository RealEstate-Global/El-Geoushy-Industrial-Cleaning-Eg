# Changelog

## 2026-11-08 — Internationalization + animated 404 + release automation

### Added

- i18n system with Arabic (default, RTL) and English locales under
  `el-geoushy/src/shared/i18n/{en,ar}/` — one file per feature domain
  (common, header, footer, home, about, catalog, faq, contact, legal, errors, cta).
- `LocaleProvider` with `useDict`/`useLocale`, localStorage-persisted locale,
  `localeInitScript` for SSR-safe `<html lang dir>` sync, and an EN/عربي language
  toggle in the header and mobile menu.
- i18n parity test (`src/test/i18n.test.ts`) locking the EN/AR key shapes.

### Changed

- Animated 404 page (`NotFoundPage`) — gradient text, floating glow, spring
  entrance, quick links — wired as the router `notFoundComponent`; root error
  boundary is now localized.
- Home/about/contact pages consume dictionaries via `useDict`; SEO helper and
  nav/business names are locale-aware.

### Added

- `.github/workflows/release.yml` — automatic GitHub Release on `v*` tags,
  publishing frontend (`el-geoushy/.output`) and backend (`backend/artifacts`)
  artifacts.

## 2026-11-08 — Frontend feature-based restructure + pnpm

### Changed

- Restructured `el-geoushy/src` for scale: thin file-based route wrappers now
  delegate to `src/features/` (app-shell, marketing, catalog, faq, contact,
  legal) and `src/shared/` (ui, components, config, lib, hooks, providers).
- Split the monolithic `components/site/ui.tsx` into
  `src/shared/components/page-sections.tsx` and
  `src/features/catalog/components/catalog-sections.tsx`; catalog query helpers
  moved to `src/features/catalog/lib/catalog-queries.ts` and the contact form
  schema to `src/features/contact/lib/schema.ts`.
- Reorganized shadcn primitives into `src/shared/ui/` and updated
  `components.json` aliases (`@/shared/...`).
- Switched the package manager from bun to pnpm: `packageManager` pin, settings
  (overrides, `onlyBuiltDependencies`, `minimumReleaseAge`) moved to
  `pnpm-workspace.yaml`, removed `bunfig.toml` and `bun.lock`, generated
  `pnpm-lock.yaml`.
- Frontend CI (`.github/workflows/frontend.yml`) now uses
  `pnpm/action-setup@v4` + `actions/setup-node@v4` with Node 22.

### Removed

- Bun files and tooling (`bunfig.toml`, `bun.lock`) and stale build output.

## 2026-11-08 — Monorepo restructure

### Changed

- Moved the frontend into `el-geoushy/` with its own package.json, lockfile,
  Vite, TypeScript, Prettier, ESLint, and Vitest config.
- Added `backend/` with an ASP.NET Core 9 Clean Architecture solution
  (Domain, Application, Infrastructure, Api) plus Domain and Application tests.
- Added `docs/` with architecture, frontend, backend, API, development,
  deployment, error-reporting, and product documentation.
- Added `.github/` with frontend/backend CI, Dependabot, and issue/PR templates.
- Regenerated `el-geoushy/bun.lock`.

### Removed

- Hosted-platform Vite wrapper (`@lovable.dev/vite-tanstack-config`) and its
  entries in `bunfig.toml`.
- `.lovable/` metadata (product north star preserved in `docs/`).
- Hosted-platform error reporting hooks and `lovable-error-reporting.ts`.
- Hosted-platform README and agent instructions.

### Fixed

- Frontend now builds with explicit Vite plugins and emits
  `.output/server/index.mjs` (Nitro `node-server`).
- Error reporting is local, with an optional backend sink at
  `POST /api/client-errors`.
- Frontend source formatted to the repository Prettier config; lint passes.
