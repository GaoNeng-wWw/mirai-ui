// DO NOT REMOVE THIS FILE FROM .gitignore PLEASE!
import { MCollapse,MCollapseItem,MCollapseHeader,MCollapseContent } from '@miraiui-org/vue-collapse';;
import { MButton } from '@miraiui-org/vue-button';
import { Plugin } from 'vue';

export default {
  install(app) {
    app.component(MCollapse.name!, MCollapse);;
app.component(MCollapseItem.name!, MCollapseItem);;
app.component(MCollapseHeader.name!, MCollapseHeader);;
app.component(MCollapseContent.name!, MCollapseContent);;
app.component(MButton.name!, MButton);
  },
} as Plugin;

export * from '@miraiui-org/vue-collapse';;
export * from '@miraiui-org/vue-button';
