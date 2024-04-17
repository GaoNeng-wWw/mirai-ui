import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import PropsTableData from '../props-table-data.json'
import { camelize } from "vue";

const isOpen = (token: MarkdownIt.Token) => token.nesting === 1;
const MODES = ['vue', 'react'];
const isMode = (maybeMode: string) => MODES.includes(maybeMode);
export const propsTablePlugin: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.use(MarkdownItContainer, 'props', {
    validate(params:string){
      return params.trim().match(/^props\s*(.*)$/)
    },
    render(tokens: MarkdownIt.Token[], idx: number){
      const cur = tokens[idx];
      if (isOpen(cur)){
        const componentNameRaw = cur.info.trim().match(/^props\s*(.*)$/)[1];
        const componentName = `${camelize(componentNameRaw)[0].toUpperCase()}${camelize(componentNameRaw).slice(1)}`;
        return `<props-table component-name="${componentName}" `
        // return `<props-table :data="${JSON.stringify(PropsTableData[componentName])}" />`
      }
      return '/>'
    }
  })
}