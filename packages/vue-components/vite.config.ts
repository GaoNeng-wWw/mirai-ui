/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
      external: [
        'vue', '@miraiui-org/theme',
        // '@floating-ui/vue',
        // '@floating-ui/dom',
        // '@floating-ui/core'
      ],
      output:{
        exports: 'named',
        globals:{
          vue: 'Vue',
          '@miraiui-org/theme': '@miraiui-org/theme'
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
        find: /^@miraiui-org\/vue-(?!components\b)(.*)$/,
        replacement: new URL('./$1', import.meta.url).pathname
      },
      {
        find: /^@miraiui-org\/theme$/,
        replacement: new URL('../theme', import.meta.url).pathname
      },
      {
        find: /^@miraiui-org\/hooks$/,
        replacement: new URL('../hooks', import.meta.url).pathname
      }

    ]
  }
});
