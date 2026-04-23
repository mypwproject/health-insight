// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Check if we're building for Vercel (static deployment)
const isVercelBuild = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;

export default defineConfig(
  isVercelBuild
    ? {
        vite: {
          build: {
            rollupOptions: {
              output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
              },
            },
          },
        },
      }
    : {
        vite: {
          build: {
            rollupOptions: {
              output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
              },
            },
          },
        },
      }
);

