import type { App } from 'vue';
import Mask from './src/mask.vue';

export { Mask };

export default {
  name: 'Mask',
  install: (app:App) => {
    app.component(Mask.name!, Mask);
  }
};