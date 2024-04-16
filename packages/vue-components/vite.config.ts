/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib:{
      entry: 'index.ts',
      name: 'MiraiUi',
      fileName: 'vue-components',
      formats: ['es', 'umd'],
    },
    rollupOptions:{
      external: ['vue', '@mirai-ui/theme'],
      output:{
        exports: 'named',
        globals:{
          vue: 'Vue',
          '@mirai-ui/theme': '@mirai-ui/theme'
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    environment: 'happy-dom',
    exclude: ['./index.ts', './**/index.ts', 'node_modules', './**/node_modules'],
    coverage:{
      exclude: [
        'node_modules/**', 'node_modules',
        '**/node_modules/**', '**/dist/**',
        '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', 
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
        '**/index.ts',
        '.eslintrc.cjs'
      ],
    },
  },
  resolve:{
    alias: [
      {
        find: /^@mirai-ui\/vue-(?!components\b)(.*)$/,
        replacement: join(__dirname, '.')
      },
      {
        find: /^@mirai-ui\/theme$/,
        replacement: join(__dirname, '../theme')
      }
    ]
  }
});
