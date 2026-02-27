import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  staticDirs: ["../client/public"],
  stories: [
    "../client/src/guidelines/**/*.mdx",
    "../client/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const base = process.env.BASE_PATH ?? "/";
    return mergeConfig(config, {
      base,
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../client/src"),
        },
      },
      root: path.resolve(__dirname, "../client"),
    });
  },
};

export default config;
