import propsData from '../props-table-data.json'
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";

const isOpen = (token: MarkdownIt.Token) => token.nesting === 1;

export const propsTablePlugin: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.use(MarkdownItContainer, 'props-table', {
    validate(params:string){
      return params.trim().match(/^props\-table\s*(.*)$/)
    },
    render(tokens: MarkdownIt.Token[], idx: number){
      const cur = tokens[idx];
      if (isOpen(cur)){
        const compName = cur.info.trim().match(/^props\-table\s*(.*)$/)?.[1]??'';
        if (!(compName in propsData)){
          return {};
        }
        const {tableData,  typeAlias} = propsData[compName as keyof typeof propsData];
        return `<props-table tableData="${md.utils.escapeHtml(JSON.stringify(tableData))}">`
      }
      return '</props-table>'
    }
  })
}