import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts',
  format: ['es', 'cjs'],
  dts: true,
  // attw: true,
  // publint: true,
});
