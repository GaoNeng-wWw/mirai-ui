import { join } from 'path';
import { kebabCase, pascalCase } from 'change-case';

export const ROOT = join(__dirname, '../../');
export const COMPONENT_ROOT = join(ROOT, 'components');
export const THEME_ROOT = join(ROOT, 'theme');
export const CORE_ROOT = join(ROOT, 'core');

export const COMPONENT_TEMPLATE = (name: string) => {
  const pascalCaseName = pascalCase(name);
  const kebabCaseName = kebabCase(name);
  return {
    'tsdown.config.ts': `import { defineConfig } from 'tsdown';
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
  noExternal: [\/@miraiui-org\/internal-utils\/],
});`,
    'tsconfig.json': `{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue",
  }
}`,
    'package.json': `{
  "name": "@miraiui-org/vue-${kebabCaseName}",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsdown",
    "clean": "rimraf dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.1",
  "devDependencies": {
    "@miraiui-org/internal-utils": "workspace:*",
    "@miraiui-org/theme": "workspace:*",
    "motion-v": "catalog:",
    "vue": "catalog:"
  },
  "peerDependencies": {
    "@miraiui-org/theme": "workspace:*",
    "motion-v": "catalog:",
    "vue": "catalog:"
  }
}`,
    'index.ts': `import { withInstall } from '@miraiui-org/internal-utils';
import M${pascalCaseName} from './${kebabCaseName}.vue';

export default withInstall({
  name: '${pascalCaseName}',
  components: [M${pascalCaseName}],
});

export { M${pascalCaseName} };

export * from './${kebabCaseName}.props';`,
    [`${kebabCaseName}.vue`]: `<script lang="ts" setup></script>
<template>
</templat>
`,
    [`${kebabCaseName}.props.ts`]: `export type ${pascalCaseName}Props = {}`,
    [`stories/${kebabCaseName}.mdx`]: '',
  };
};
