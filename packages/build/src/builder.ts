import { defineConfig, PluginOption, Rollup } from 'vite';
import { absCwd } from './utils/path';
import { camelCase } from './utils/format';
import { sep } from 'path';
import vue from '@vitejs/plugin-vue';
import inspect from 'vite-plugin-inspect';
import visualizer from 'rollup-plugin-visualizer';

interface BuilderOptions {
  plugins?: PluginOption[];
  external?: (string | RegExp)[];
  output?: Rollup.OutputOptions;
  visualizer?: boolean
}

const compName = (path: string) => camelCase(
  path.split(sep).at(-1) ?? '', true
);

export const builder = (
  options: BuilderOptions={}
) => {
  const baseConfig = defineConfig({
    publicDir: false,
    plugins: options.plugins ?? [vue(), inspect(), options.visualizer ? visualizer() : null]
  });
  const basePath = absCwd();
  const componentName = `M${compName(basePath)}`;
  return defineConfig({
    ...baseConfig,
    build:{
      rollupOptions:{
        external: ['vue', '@miraiui-org/theme', ...options.external ?? []],
        output: {
          globals: {
            'vue': 'vue',
            '@miraiui-org/theme': '@miraiui-org/theme',
            ...options.output?.globals
          },
          exports: options.output?.exports ?? 'named',
          extend: options.output?.extend ?? true,
          ...options.output
        }
      },
      lib:{
        name: componentName,
        entry: absCwd('index.ts'),
        fileName: 'index',
        formats: ['es', 'umd', 'cjs']
      },
      emptyOutDir: false
    },
    publicDir: false,
  });
};