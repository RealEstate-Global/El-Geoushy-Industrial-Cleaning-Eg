# Frontend migration note

The public storefront was migrated to a standalone Next.js App Router application in `el-geoushy/`. Its active build no longer uses the former TanStack Start/Vite runtime. The frontend package and lockfile define the current runtime; see [frontend setup](FRONTEND_SETUP.md).

The admin route is a local browser demo. It has no hosted platform, remote telemetry, API integration, or secure authentication.
