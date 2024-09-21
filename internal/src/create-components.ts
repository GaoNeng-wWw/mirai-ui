import packages from '../../packages/vue-components/package.json';
import shell from 'shelljs';
import { createFileSync, writeFileSync } from 'fs-extra';
import camelCase from 'camelcase';
import dashify from 'dashify';
import inquirer from 'inquirer';
import { join } from 'path';
import { existsSync } from 'fs';
import { info, err, warn, buildMsg } from './log';

const builder = {
  directive: () => true,
  components: (name: string, root: string) => {
    const componentsFiles: {
          [x:string]: string
        } = {
          [join(root, name, 'index.ts')]: `import type {App} from 'vue';
import ${camelCase(name, { pascalCase: true })} from './src/${camelCase(name)}.vue';

export {${camelCase(name, { pascalCase: true })}};

export default {
    name: '${camelCase(name, { pascalCase: true })}',
    install: (app:App) => {
        app.component(${camelCase(name, { pascalCase: true })}.name!, ${camelCase(name, { pascalCase: true })});
    }
}`,
          [join(root, name, 'src', `${camelCase(name)}.vue`)]: `<template>
  <slot />
</template>
<script setup lang="ts">
const COMPONENT_NAME='M${camelCase(name, { pascalCase: true })}'
defineOptions({
  name: COMPONENT_NAME
})
</script>`,
          [join(root, name, '__tests__', `${camelCase(name)}.test.ts`)]: `import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import ${camelCase(name)} from '../src/${camelCase(name)}.vue';
describe('${camelCase(name)}', ()=>{
    it('should to be defined', ()=>{
        expect(mount(${camelCase(name)})).toBeDefined()
    })
})
    `,
          [join(root, name, 'package.json')]: `{
  "name": "@miraiui-org/vue-${name}",
  "version": "${packages.version}",
  "dependencies": {
  },
  "devDependencies": {
    "@miraiui-org/theme": "workspace:^",
    "vue": "^3.4.31",
    "vue-tsc": "^2.0.22",
    "vite": "^5.3.2"
  },
  "scripts": {
    "build:dts": "vue-tsc --declaration --emitDeclarationOnly",
    "build": "vite",
    "clean": "rimraf dist",
    "clean:dep": "rimraf node_modules"
  },
  "exports":{
    ".":{
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"]
}
`,
          [join(root, name, 'tsconfig.json')]: `{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
  },
}
`,
          [join(root, name, 'vite.config.ts')]: `import {builder} from '../../build';

export default builder();
`
        };
    console.clear();
    info(`Ready build ${name} component`);
    const componentBase = join(root, name);
    if (existsSync(componentBase)) {
      err(`${name} component is exists`);
      process.exit(-1);
    }
    warn('Build Start');
    for (const [path, value] of Object.entries(componentsFiles)) {
      try {
        createFileSync(path);
        writeFileSync(path, value);
        buildMsg(path.trim(), true);
      } catch (e) {
        buildMsg(path.trim(), false);
        err(e);
      }
    }
    shell.cd(join(root, name))
      .exec('pnpm i ')
      .exec('pnpm -w lint:fix');
    return true;
  }
} as const;

inquirer.prompt<{ Type: 'components'|'directive', Name: string }>([{
  name: 'Type',
  type: 'list',
  choices: ['components', 'directive']
}, {
  name: 'Name',
  type: 'input'
}])
  .then(({ Type, Name }) => {
    const type = Type;
    const name = dashify(Name, { condense: true });
    const root = join(__dirname, '../../packages', `vue-${type}`);
    builder[type](name, root);
  });