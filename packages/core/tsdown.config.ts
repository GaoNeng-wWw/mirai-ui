import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  outDir: 'dist',
  external: ['motion-v', 'vue', '@miraiui-org/theme'],
  noExternal: [
    /@miraiui-org+\/.*/,
    '@miraiui-org/internal-utils',
    '@miraiui-org/vue-button',
  ],
  treeshake: true,
  attw: true,
  publint: true,
});
