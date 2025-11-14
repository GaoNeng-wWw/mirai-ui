import type { App } from 'vue';
import Checkbox from './src/checkbox.vue';

export { Checkbox };

export default {
  name: 'Checkbox',
  install: (app: App) => {
    app.component(Checkbox.name!, Checkbox);
  }
};