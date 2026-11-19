# Frontend demo data

The initial product, four provisional color variants, offer, FAQ entries, social settings, Maps URLs, and metadata are defined in `el-geoushy/src/features/product/data/product.seed.ts`. Locale UI dictionaries are separate files per language under `src/features/i18n/data/ar/` and `src/features/i18n/data/en/`.

The `/admin` interface is labeled **Demo Mode**. It supports editing product details, variant ordering/visibility, offer values, bilingual home copy, FAQs, contact/social settings, Maps/review destinations, and SEO fields. Edits are stored in this browser's `localStorage` using key `new-cetris-demo-data-v1`; locale preference uses `new-cetris-locale`.

Use **Reset demo data** in the dashboard to remove local overrides and restore the original seed. This does not publish changes, authenticate a user, create actual analytics, or persist uploads. Variant image paths are references only. All dashboard KPI values are explicitly sample/demo values.

The offer seed is two bottles for EGP 100. Variant colors are provisional and do not claim different fragrances or formulas. Product photography is not present in the current repository assets; the public site uses a visibly labeled placeholder.
