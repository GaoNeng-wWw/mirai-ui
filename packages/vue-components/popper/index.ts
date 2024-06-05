import type { App } from 'vue';
import Popper from './src/popper.vue';
import PopperTrigger from './src/trigger.vue';
import PopperContent from './src/content.vue';


export { Popper, PopperTrigger, PopperContent };
export * from './src/popper.props';

export default {
  name: 'Popper',
  install: (app:App) => {
    app.component(Popper.name!, Popper);
  }
};