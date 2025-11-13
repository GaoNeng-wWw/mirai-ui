/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tw from '@tailwindcss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vite.dev/config/
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    // vueJsx(),
    vue(),
    tw(),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h, Fragment } from \'vue\'',
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook'),
        })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium',
          }],
        },
        setupFiles: ['.storybook/vitest.setup.ts'],
      },
    }],
  },
  resolve: {
    alias: {
      '@miraiui-org/theme': join(dirname, '../theme/src/index.ts'),
      '@miraiui-org/internal-utils': join(dirname, '../utils/internal/src/index.ts'),
    },
  },
  define: {
    'process.env.NODE_DEBUG': false,
  },
});
