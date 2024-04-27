// https://vitepress.dev/guide/custom-theme
import demo from '../components/demo.vue';
import propsTable from '../components/props-table.vue';
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Miraiui from '@miraiui-org/vue-components/index';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component(demo.name!, demo)
    app.component(propsTable.name! ?? 'props-table', propsTable);
    app.use(Miraiui);
  }
} satisfies Theme
