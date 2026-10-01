import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite's dev server always runs its own HTML transform on any *.html
// request instead of serving it as a plain static file (unlike build mode,
// where staticDirs are just copied as-is) - so /templates/*.html 404s in
// `storybook dev` even though it's listed in staticDirs below. This plugin
// serves those specific files directly, bypassing Vite's HTML pipeline,
// so the Templates/Auth stories' <iframe src="/templates/...">  works in
// both `storybook dev` and `build-storybook`.
const serveTemplatesHtml = {
  name: "serve-templates-html-raw",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith("/templates/") && req.url.endsWith(".html")) {
        const filePath = path.join(dirname, "..", req.url);
        if (fs.existsSync(filePath)) {
          res.setHeader("Content-Type", "text/html");
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }
      next();
    });
  },
};

/** @type {import('@storybook/html-vite').StorybookConfig} */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.js"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: [
    { from: "../assets", to: "/assets" },
    { from: "../dist", to: "/dist" },
    { from: "../templates", to: "/templates" },
  ],
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(viteConfig, {
      plugins: [serveTemplatesHtml, tailwindcss()],
    });
  },
};

export default config;
