// https://vitepress.dev/guide/custom-theme
import demo from '../demo/demo.vue';
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Miraiui from '@mirai-ui/vue-components';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component(demo.name!, demo)
    app.use(Miraiui);
  }
} satisfies Theme
