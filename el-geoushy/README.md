# el-geoushy (frontend)

Arabic-first storefront for El Geuishi industrial detergents. TanStack Start +
React 19 + Vite + Tailwind CSS 4.

This folder is self-contained. Install and run it here; there is no workspace
root to set up.

```sh
corepack enable pnpm   # once, to activate the pnpm version pinned in package.json
pnpm install
pnpm run dev        # http://localhost:8080
```

Other commands: `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`,
`pnpm run build`, `pnpm run start`.

## Source layout

- Business/contact data: `src/shared/config/site.ts` (a `null` field hides its UI).
- Routes: `src/routes/` — thin wrappers only (head/loader/route wiring); all UI
  lives in `src/features/` and `src/shared/`.
- Features (`src/features/`):
  - `app-shell/` — Header, Footer, Logo, WhatsApp button.
  - `marketing/` — home and about pages.
  - `catalog/` — product/category data (`data/`), queries (`lib/`), cards and
    grids (`components/`), listing and detail pages (`pages/`).
  - `faq/` — FAQ data, accordion, page.
  - `contact/` — form schema (`lib/schema.ts`), form, page.
  - `legal/` — LegalPage component plus privacy/terms page content.
- Shared (`src/shared/`): `ui/` primitives (shadcn), `components/` page sections,
  `config/`, `lib/`, `hooks/`, `providers/` (theme).

Full documentation: [../docs/FRONTEND.md](../docs/FRONTEND.md) and
[../docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md).
