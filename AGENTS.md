# Agent and contributor rules

## Layout

- `el-geoushy/` — the single public frontend, using Next.js App Router, React, TypeScript, and Tailwind CSS.
- `backend/` — existing ASP.NET Core solution preserved for a future phase. The NEW CETRiS MVP must not connect to or modify it.
- `docs/` — architecture, setup, brand, deployment, demo data, and future backend documentation.
- `.github/` — CI and repository templates.

## Frontend

- Keep NEW CETRiS product demo data centralized in the typed frontend data seeds/repositories. Keep Arabic and English UI dictionaries split by locale and feature under `src/features/i18n/data/{ar,en}/`.
- Keep App Router files thin. Product and admin UI belongs under `src/features/`; browser persistence belongs behind client-only repository adapters.
- `localStorage` and `window` must only be accessed in Client Components or client-only adapters. The admin is a clearly labeled demo and must not imply security or shared persistence.
- Do not fabricate product facts, product photography, contact details, review counts, Place IDs, or social links. Preserve unverified WhatsApp input and hide unknown Instagram.
- Use pnpm (pinned in `el-geoushy/package.json`).

## Backend

- Preserve the current `backend/` tree untouched for frontend-only product work.
- If a later task explicitly changes backend code, preserve inward dependency direction `Api -> Infrastructure -> Application -> Domain`; persistence is accessed through `IApplicationDbContext` and endpoints stay thin.

## Secrets

Never commit secret values. Public frontend build variables are public and must not contain secrets.
