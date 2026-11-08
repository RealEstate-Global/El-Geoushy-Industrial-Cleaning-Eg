# Removal of the hosted-platform build

The project was originally created inside a hosted editor that injected its own
Vite wrapper, metadata folder, telemetry hooks, and README content. All of that
has been removed so the app builds and runs from this repository alone.

## Removed

| Removed | Why |
| --- | --- |
| `@lovable.dev/vite-tanstack-config` dev dependency | Replaced with explicit Vite plugins |
| `.lovable/` folder | Hosted-editor metadata; north star preserved in `docs/` |
| `src/lib/lovable-error-reporting.ts` | Replaced by `src/lib/error-reporting.ts` |
| `window.__lovableEvents` / `__lovableReportRuntimeError` hooks | No host runtime exists |
| Hosted README instructions and editor rules | Replaced with local documentation |
| `minimumReleaseAgeExcludes` entries in `bunfig.toml` | Only applied to hosted packages |
| Hosted-project references in `start.ts` comments | Replaced with local guidance |

## Replaced Vite configuration

The wrapper used to provide TanStack Start, React, Tailwind, path aliases, and
Nitro implicitly. `el-geoushy/vite.config.ts` now declares them directly:

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { host: true, port: 8080, strictPort: false },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    nitro(),
  ],
});
```

## Lockfile

Historical note: bun was used at the time this document was written. The project
has since switched to pnpm (`pnpm-lock.yaml`; `bunfig.toml`/`bun.lock` removed).
Do not mix package managers — regenerate lockfiles from `package.json`.

## Verification performed

Verified with bun at the time of removal (the project now uses pnpm):

- `typecheck` — passed
- `test` — passed
- `build` — produced `.output/server/index.mjs` with the Nitro
  `node-server` preset
- `dotnet build` / `dotnet test` for the backend — passed
- API smoke test: health, categories, products, client-error sink — passed
