import { Plugin } from 'vite';

const COMPONENTS_DIR = 'src/components'
const VIRTUAL_MODULE_ID = 'virtual:component-props'
const resolvedVirtualModuleId = '\0' + VIRTUAL_MODULE_ID

export type ComponentTypeDocOptions = {
  basePath: string;
}

const componentTypeDoc = (
  {
    basePath
  }: ComponentTypeDocOptions
) => {
  const plugin:Plugin = {
    name: 'vite-plugin-component-type-doc',
    resolveId(source, importer, options) {
      if (source === resolvedVirtualModuleId) {
  
      }
    },
  }
}
