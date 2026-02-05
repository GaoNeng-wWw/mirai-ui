// DO NOT REMOVE THIS FILE FROM .gitignore PLEASE!
import { MButton } from '@miraiui-org/vue-button';
import { Plugin } from 'vue';

export default {
  install(app) {
    app.component(MButton.name!, MButton);
  },
} as Plugin;

export * from '@miraiui-org/vue-button';
