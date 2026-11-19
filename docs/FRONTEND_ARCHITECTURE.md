# Frontend architecture

The sole active public frontend is `el-geoushy/`, implemented with Next.js App Router, React, and strict TypeScript. There is no competing Vite/TanStack app in the active frontend tree.

## Structure

- `src/app/` contains thin route entry points, root metadata, error/404 handling, and sitemap/robots metadata.
- `src/features/site/` contains the public shell, page composition, shared location section, and client provider.
- `src/features/admin/` contains the browser-only demo dashboard.
- `src/features/product/data/product.seed.ts` provides typed demo seed data.
- `src/features/i18n/data/ar/` and `src/features/i18n/data/en/` hold split locale dictionaries. Locale selection is persisted in local browser storage.
- `src/lib/repositories/` contains a repository interface and browser demo adapter. UI components do not access `localStorage` directly.
- `src/types/` defines shared frontend types.

Public routes: `/`, `/product`, `/uses`, `/how-to-use`, `/offers`, `/faq`, and `/contact`. `/admin` is a visual simulation, not a production admin.

## Data flow

Server rendering uses typed seed values. The client provider loads browser-local overrides after mount and persists edits through the demo repository. A future API adapter can implement the repository interfaces without coupling UI components to a particular backend. No API, database, identity provider, or payment integration is included.
