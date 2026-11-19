# NEW CETRiS frontend

Arabic-first Next.js App Router frontend and browser-only admin demo for NEW CETRiS. The demo is not a secure or shared admin system and has no backend connection.

```sh
corepack enable pnpm
pnpm install
pnpm dev
```

Routes: `/`, `/product`, `/uses`, `/how-to-use`, `/offers`, `/faq`, `/contact`, `/admin`.

Typed seed data lives in `src/features/product/data/product.seed.ts`; bilingual content dictionaries are split into `src/features/i18n/data/ar/` and `src/features/i18n/data/en/`. Browser persistence is accessed through `src/lib/repositories/demo-data.ts` and `DemoProvider`. Admin changes can be cleared with **Reset demo data**.

Product photos, WhatsApp E.164 confirmation, and the verified Google business/review destination are owner follow-ups. See the root `docs/` folder for details.
