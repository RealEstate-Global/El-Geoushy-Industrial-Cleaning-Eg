# Frontend (`el-geoushy/`)

Storefront for El Geuishi industrial detergents. Arabic-first, RTL, mobile-first.

## Stack

- TanStack Start 1.168 (SSR + file-based routing)
- React 19 + TanStack Router/Query
- Vite 8 (Rolldown) with `@vitejs/plugin-react`
- Tailwind CSS 4 via `@tailwindcss/vite`
- shadcn/ui + Radix primitives
- Vitest + Testing Library
- pnpm (pinned via `packageManager` in `package.json`)

## Commands

Run from `el-geoushy/` (pnpm version is pinned, `corepack enable pnpm` once):

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies from `pnpm-lock.yaml` |
| `pnpm run dev` | Dev server on <http://localhost:8080> |
| `pnpm run build` | Production build into `.output/` |
| `pnpm run start` | Serve `.output/server/index.mjs` with Node |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm run lint` | ESLint (includes Prettier) |
| `pnpm run format` | Prettier write |
| `pnpm run test` | Vitest run |

## Source layout

Pages and components live outside `src/routes/` so the folder stays scalable:

```
src/
  routes/            file-based routes — thin wrappers only (head/loader/wiring)
  routeTree.gen.ts   generated — never edit
  server.ts          custom SSR entry
  start.ts           request middleware + CSRF
  styles.css         Tailwind 4 tokens
  shared/            cross-feature building blocks
    ui/              shadcn primitives (button, card, dialog, ...)
    components/      page sections (SectionHeading, PageHero, CtaBanner, ...)
    config/          site.ts — business/contact data
    lib/             utils, seo, motion, error reporting/capture
    hooks/           shared hooks
    providers/       theme
  features/          vertical slices
    app-shell/       Header, Footer, Logo, WhatsApp button
    marketing/       HomePage, AboutPage
    catalog/         data/, lib/ (queries), components/ (cards/grids), pages/
    faq/             data/, components/ (accordion), pages/
    contact/         lib/ (form schema), components/ (form), pages/
    legal/           LegalPage component + privacy/terms page content
```

## Routing

TanStack Start maps files in `src/routes/` to URLs. Do not add `src/pages/` or
Next.js-style layouts. The only root shell is `src/routes/__root.tsx`.
Route files keep only route concerns (`createFileRoute` options: `head`,
`loader`, `validateSearch`, `component` wiring); the actual page components come
from `src/features/*/pages/`. `src/routeTree.gen.ts` is generated — never edit it.

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `categories.tsx` | `/categories` |
| `products.tsx` + `products.index.tsx` | `/products` |
| `products.$slug.tsx` | `/products/:slug` |
| `contact.tsx` | `/contact` |
| `faq.tsx` | `/faq` |
| `privacy.tsx` | `/privacy` |
| `terms.tsx` | `/terms` |
| `sitemap[.]xml.tsx` | `/sitemap.xml` |

## Config and content

- `src/shared/config/site.ts` — name, description, public URL, contact channels,
  social links, navigation. Any field left `null` is hidden by the UI. Never
  invent a phone number, address, or social link.
- `src/features/catalog/data/catalog.ts` — category/product types plus the demo
  arrays (entries marked `isDemo: true`). Query helpers (`getCategory`,
  `getProduct`, `getRelated`, `filterProducts`, `SORTS`, `isSortKey`) live in
  `src/features/catalog/lib/catalog-queries.ts`.
- `src/features/faq/data/faq.ts` — FAQ entries.
- `src/features/contact/lib/schema.ts` — contact form schema (shared with tests).

## Styling

- Tokens and utilities live in `src/styles.css` (Tailwind 4 `@theme`).
- Reusable UI primitives live in `src/shared/ui/` (configure via `components.json`
  aliases, which point at `@/shared/...`).
- Shared page sections (hero, headings, banners, skeletons, empty/error states)
  live in `src/shared/components/page-sections.tsx`.
- Catalog-specific cards/grids live in `src/features/catalog/components/`.
- Motion helpers are in `src/shared/lib/motion.ts`; `MotionConfig` respects the
  user's reduced-motion preference.

## Server entry and errors

`src/server.ts` is the custom SSR entry. It wraps the TanStack Start handler,
turns h3-swallowed 500 JSON responses into a readable error page, and logs the
captured error. `src/start.ts` installs request middleware and CSRF protection
for server functions. Keep both unless you intentionally replace them.

## Tests

`src/test/` contains routing, catalog-query, and contact-schema tests.
`vitest.config.ts` sets the `@` alias and jsdom environment. Use `pnpm run test`.

## Environment variables

Only build-time `VITE_*` variables are available in browser code. They are
public. `VITE_ERROR_REPORT_ENDPOINT` is optional; see
[Error reporting](ERROR_REPORTING.md).
