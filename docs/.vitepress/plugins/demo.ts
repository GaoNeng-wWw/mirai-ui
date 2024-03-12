import {readFileSync} from 'fs';
import {join} from 'path';
import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
const localMd = MarkdownIt();

const isOpen = (token: MarkdownIt.Token) => token.nesting === 1;
const isSelfClose = (token: MarkdownIt.Token) => token.nesting === 0;
const isClose = (token: MarkdownIt.Token) => token.nesting === -1;

export const blockPlugin:MarkdownIt.PluginSimple = (md: MarkdownIt) => {
    md.use(mdContainer, 'demo', {
        validate(params:string){
            return params.trim().match(/^demo\s*(.*)$/);
        },
        render(tokens: MarkdownIt.Token[], idx: number){
            const cur = tokens[idx];
            if (isOpen(cur)){
                const demoPath = cur.info.trim().match(/^demo\s*(.*)$/)?.[1] ?? '';
                const children = [];
                for (let i=idx;i<tokens.length;i++){
                    if (tokens[i].type === 'container_demo_close'){
                        children.push(tokens[i]);
                        break;
                    }
                    children.push(tokens[i]);
                }
                const description = localMd.renderer.render(children, localMd.options, {});
                const [componentName, demoName] = demoPath.split('/');
                const code = readFileSync(
                    join(__dirname, `../../components/${componentName}/demos/${demoName}.vue`)
                ).toString()
                return `
                <suspense>
                <demo
                    component-name="${componentName}"
                    demo-name="${demoName}"
                    code="${md.utils.escapeHtml(code)}"
                >
                `
            }
            return `</demo></suspense>`
            // console.log(tokens);
        }
    })
}