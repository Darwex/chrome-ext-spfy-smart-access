import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import hotReloadExtension from "hot-reload-extension-vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/ui-modules/index.tsx"),
        // popup: resolve(__dirname, 'src/pages/popup/index.html'),
        // content: resolve(__dirname, 'src/pages/content/index.ts'),
        background: resolve(
          __dirname,
          "src/chrome-extension/background/index.ts"
        ),
        // 'dev-tools': resolve(__dirname, 'src/pages/dev-tools/index.html'),
        // panel: resolve(__dirname, 'src/pages/panel/index.html')
      },
      output: {
        dir: "dist",
        entryFileNames: "src/[name]/index.js",
        chunkFileNames: "assets/js/[name].js",
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
        {
          src: "src/chrome-extension/assets",
          dest: ".",
        },
      ],
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: "src/chrome-extension/background/index.ts",
    }),
    react(),
  ],
});
