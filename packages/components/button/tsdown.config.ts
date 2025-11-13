import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
  format: ['es', 'cjs'],
  platform: 'neutral',
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
  outDir: 'dist',
  dts: {
    vue: true,
  },
  attw: true,
  publint: true,
  unused: true,
  noExternal: [/@miraiui-org\/internal-utils/],
});
