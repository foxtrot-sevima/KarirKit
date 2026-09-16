import tailwindcss from "@tailwindcss/vite";

/** @type {import('@storybook/html-vite').StorybookConfig} */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.js"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: [{ from: "../assets", to: "/assets" }],
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
    });
  },
};

export default config;
