# Frontend setup

Requirements: Node.js 22 or later and pnpm 12 as pinned in the frontend package manifest.

```sh
cd el-geoushy
corepack enable pnpm
pnpm install
pnpm dev
```

The development site runs at `http://localhost:3000` by default. Frontend checks:

```sh
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build
```

No environment variables are required for the frontend-only demo. No API endpoint is called.
