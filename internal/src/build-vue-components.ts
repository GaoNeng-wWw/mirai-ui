import {defineConfig, build, Rollup} from 'vite';
import vue from '@vitejs/plugin-vue';
import fg from 'fast-glob';
import { dirname, join, resolve } from 'path';
import camelcase from 'camelcase';

const baseConfig = defineConfig({
  publicDir: false,
  plugins: [vue()],
});

const rollupOptions:Rollup.RollupOptions = {
  external: ['vue', '@mirai-ui/theme', /@mirai-ui.*/],
  output: {
    globals: {
      vue: 'Vue',
      '@mirai-ui/theme': '@mirai-ui/theme'
    },
    extend: true,
    exports: 'named'
  },
  treeshake: true,
};

const buildComponent = async () => {
  const components = fg.sync(['packages/vue-components/*'], {
    ignore: ['**/node_modules'],
    onlyDirectories: true
  })
  // buildSingle
  for (const component of components){
    const entryPath = resolve(component, 'index.ts');
    const outputDir = resolve(component, 'dist');
    await build(
      defineConfig({
        ...baseConfig,
        build:{

          rollupOptions,
          lib:{
            name: `M${camelcase(component.split('/').at(-1), {pascalCase: true})}`,
            entry: entryPath,
            fileName: 'index',
            formats: ['es', 'umd', 'cjs'],
          },
          outDir: outputDir,
          emptyOutDir: false,
        },
      })
    )
  }
}

buildComponent()
.then(()=>{
  process.exit()
})