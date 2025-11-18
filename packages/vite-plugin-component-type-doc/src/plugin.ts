import { Pattern } from 'fast-glob';
import { Plugin } from 'vite';
import { scanComponents } from './scan';
import { parseVueSFC } from './parser';
import { readFileSync } from 'fs';

const COMPONENTS_DIR = 'src/components'
const VIRTUAL_MODULE_ID = 'virtual:component-props'
const resolvedVirtualModuleId = '\0' + VIRTUAL_MODULE_ID

export type ComponentTypeDocOptions = {
  basePath: string;
  pattern: Pattern;
}
const toCode = (path: string) => readFileSync(path).toString();

export const componentTypeDoc = (
  {
    basePath,
    pattern
  }: ComponentTypeDocOptions
) => {
  const components = scanComponents(basePath,pattern);
  const code = toCode(components[0]);
  parseVueSFC(components[0], code)
  const plugin:Plugin = {
    name: 'vite-plugin-component-type-doc',
    resolveId(source, importer, options) {
      if (source === VIRTUAL_MODULE_ID) {
        return resolvedVirtualModuleId;
      }
    },
    load(id, options) {
      if (id.endsWith('vue')) {
        // console.log(id)
      }
    },
  }
  return plugin;
}
