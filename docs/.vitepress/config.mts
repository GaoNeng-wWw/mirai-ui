import { defineConfig } from 'vitepress'
import {blockPlugin} from './plugins/demo';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mirai ui",
  description: "A moden ui library",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Button', link: '/components/button/'
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          {
            text: 'Button', link: '/components/button'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

  },
  markdown: {
    config(md) {
      md.use((instance)=>{
        instance.use(blockPlugin, {});
      })
    },
  }
})
