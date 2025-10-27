import { defineConfig } from 'tsdown';

export default defineConfig({
  attw: true,
  publint: true,
  workspace: {
    include: [
      './packages/**/*',
    ],
  },
});
