import {join} from 'path';
import {readdirSync} from 'fs';
import { DefaultTheme, defineConfig } from 'vitepress'
import {blockPlugin} from './plugins/demo';
import { propsTablePlugin } from './plugins/props-table';

export default defineConfig({
  title: "Mirai ui",
  description: "A moden ui library",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/'},
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          {
            text: '快速开始',
            link: '/guide/'
          }
        ]
      },
      {
        text: 'Components',
        items: [...generateSideBar()]
      }
    ],
    i18nRouting: true,
  },
  markdown: {
    config(md) {
      md.use((instance)=>{
        instance.use(blockPlugin, {});
        // instance.use(propsTablePlugin, {})
      })
    },
  },
  locales:{
    root: {
      label: '中文',
      lang: 'zh'
    }
  },
  vite: {
    resolve:{
      alias: [
        {
          find: /^@mirai-ui\/vue-(?!components\b)(.*)$/,
          replacement: join(__dirname, '../../packages/vue-components/$1')
        },
        {
          find: /^@mirai-ui\/theme$/,
          replacement: join(__dirname, '../../packages/theme')
        }
      ]
    }
  }
})

function generateSideBar(){
  const hasMarkdownFile = (files: string[]) => files.some((file) => file.includes('.md'))
  const root = process.cwd();
  const sideBars:DefaultTheme.SidebarItem[] = [];
  const components = readdirSync(join(root, 'components'));
  for (const comp of components){
    const compPath = join(root, 'components', comp);
    const files = readdirSync(compPath);
    const shouldDrop = !(files.length > 0 && hasMarkdownFile(files));
    if (shouldDrop){
      console.warn(`${comp} not have markdown file`);
      continue;
    }
    sideBars.push({
      text: `${comp[0].toUpperCase()}${comp.slice(1)}`,
      link: `/components/${comp}/`
    })
    
  }
  return sideBars;
}
