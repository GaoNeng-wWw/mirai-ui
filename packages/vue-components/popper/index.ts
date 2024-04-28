import type { App } from 'vue';
import Popper from './src/popper.vue';

export { Popper };

export default {
  name: 'Popper',
  install: (app:App) => {
    app.component(Popper.name!, Popper);
  }
};