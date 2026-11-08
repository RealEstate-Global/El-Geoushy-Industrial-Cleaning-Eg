# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Versioning rules for this monorepo:

- **MAJOR** — breaking API or storefront contract changes, or a required data migration that is not backward compatible.
- **MINOR** — new features, endpoints, or UI capabilities that are backward compatible.
- **PATCH** — bug fixes, dependency patches, docs, and CI-only changes.

Frontend (`el-geoushy/package.json`) and backend (`Directory.Build.props`) share the same release version.

## [Unreleased]

### Planned

- Protect `POST /api/products` with authentication before public exposure.
- Replace `EnsureCreated` with EF Core migrations.
- Wire contact form and catalog to the backend API.
- Rate limiting on public write endpoints.

## [0.1.0] - 2026-11-08

First versioned release of the El-Geoushy industrial cleaning monorepo.

### Added

- Monorepo layout: `el-geoushy/` (storefront), `backend/` (ASP.NET Core 9 API), `docs/`, `.github/`.
- Frontend storefront on TanStack Start + React 19 + Vite + Tailwind CSS 4 with feature-based structure (`features/`, `shared/`).
- i18n (Arabic default RTL + English) with `LocaleProvider`, per-domain dictionaries, and parity tests.
- Animated localized 404 page and locale-aware SEO/nav.
- Backend Clean Architecture solution (Domain, Application, Infrastructure, Api) with EF Core SQLite, seed data, and unit tests.
- Public API: health, categories, products (list/detail/create), contact messages, client-error sink.
- Domain invariants, `DomainException` → RFC 7807 ProblemDetails handler, CORS policy, OpenAPI in Development.
- CI workflows for frontend and backend; Dependabot for nuget, bun/pnpm, and GitHub Actions.
- Release workflow on `v*` tags publishing zipped frontend and backend artifacts.

### Changed

- Package manager switched from bun to pnpm (`packageManager` pin, `pnpm-lock.yaml`).
- Frontend restructured into thin file-based routes and vertical feature slices.
- Error reporting is local-only (optional `POST /api/client-errors`); hosted-platform SDK removed.

### Removed

- Hosted-platform Vite wrapper and related metadata (`.lovable/`, platform error reporting).
- Bun lockfile and tooling from the frontend app.

### Fixed

- Frontend production build emits Nitro `node-server` output (`.output/server/index.mjs`).
- Frontend CI pnpm setup (working directory + version).

[Unreleased]: https://github.com/RealEstate-Global/El-Geoushy-Industrial-Cleaning-Eg/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/RealEstate-Global/El-Geoushy-Industrial-Cleaning-Eg/releases/tag/v0.1.0
