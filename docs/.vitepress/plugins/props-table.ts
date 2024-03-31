import propsData from '../props-table-data.json'
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import { camelize } from 'vue';

const isOpen = (token: MarkdownIt.Token) => token.nesting === 1;

export const propsTablePlugin: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.use(MarkdownItContainer, 'props-table', {
    validate(params:string){
      return params.trim().match(/^props\-table\s*(.*)$/)
    },
    render(tokens: MarkdownIt.Token[], idx: number){
      const cur = tokens[idx];
      if (isOpen(cur)){
        const compName = camelize(cur.info.trim().match(/^props\-table\s*(.*)$/)?.[1]??'').toLowerCase();
        if (!(compName in propsData)){
          return {};
        }
        const {tableData} = propsData[compName as keyof typeof propsData];
        return `<props-table tableData="${md.utils.escapeHtml(JSON.stringify(tableData))}">\n`
      } else {
        return `</props-table>`
      }
    }
  })
}