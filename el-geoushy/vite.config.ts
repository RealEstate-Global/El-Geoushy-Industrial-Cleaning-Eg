import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Local-first Vite setup. No hosted-platform wrapper: run `bun run dev`,
// `bun run build`, and `bun run start` directly from this folder.
export default defineConfig({
  server: {
    host: true,
    port: 8080,
    strictPort: false,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Use src/server.ts as the SSR entry (the local error wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    nitro(),
  ],
});
