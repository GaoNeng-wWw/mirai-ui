import packages from '../../packages/vue-components/package.json'
import shell from 'shelljs';
import { createFileSync, writeFileSync } from 'fs-extra';
import camelCase from 'camelcase';
import dashify from 'dashify';
import inquirer from 'inquirer';
import { join } from 'path';
import { existsSync } from 'fs';
import { info, err, warn, buildMsg } from './log';

const builder = {
    directive: (name: string, root: string) => {
        return true;
    },
    components: (name: string, root: string) => {
        const componentsFiles = {
            [join(root, name, 'index.ts')]: `
import type {App} from 'vue';
import ${camelCase(name, { pascalCase: true })} from './src/${camelCase(name)}.vue';

export {${camelCase(name, { pascalCase: true })}};

export default {
    name: '${camelCase(name, { pascalCase: true })}',
    install: (app:App) => {
        app.component(${camelCase(name, { pascalCase: true })}.name!, ${camelCase(name, {pascalCase: true})});
    }
}
    `,
            [join(root, name, 'src', `${camelCase(name)}.vue`)]: `
<template>
  <slot />
</template>
<script setup lang="ts">
const COMPONENT_NAME='M${camelCase(name, { pascalCase: true })}'
defineOptions({
  name: COMPONENT_NAME
})
</script>
    `,
            [join(root, name, '__tests__', `${camelCase(name)}.test.ts`)]: `
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import ${camelCase(name)} from '../src/${camelCase(name)}.vue';
describe('Button', ()=>{
    it('should to be defined', ()=>{
        expect(mount(button)).toBeDefined()
    })
})
    `,
            [join(root, name, 'package.json')]: `
{
  "name": "@mirai-ui/vue-${name}",
  "version": "${packages.version}",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "build:dts": "vue-tsc --declaration --emitDeclarationOnly"
  },
  "exports":{
    ".":{
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist.d.ts"
    }
  },
  "files": ["dist"]
}
`,
            [join(root,name,'tsconfig.json')]: `
{
  "exclude": ["node_modules", "__tests__"],
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./dist/types",
    "target": "ES2020",
    "moduleResolution": "Node",
  }
}
`
    }
        console.clear();
        info(`Ready build ${name} component`)
        const componentBase = join(root, name);
        if (existsSync(componentBase)) {
            err(`${name} component is exists`)
            process.exit(-1);
        }
        warn('Build Start')
        for (const [path, value] of Object.entries(componentsFiles)) {
            try {
                createFileSync(path)
                writeFileSync(path, value)
                buildMsg(path.trim(), true)
            } catch (e) {
                buildMsg(path.trim(), false)
                err(e)
            }
        }
        shell.cd(join(root, name))
        .exec(`pnpm i vue vue-tsc @mirai-ui/theme --save-dev --filter @mirai-ui/vue-${name}`)
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
        builder[type](name,root);
    })