import type { App } from 'vue';
import TransitionSlideFade from './src/transitionSlideFade.vue';

export { TransitionSlideFade };

export default {
  name: 'TransitionSlideFade',
  install: (app:App) => {
    app.component(TransitionSlideFade.name!, TransitionSlideFade);
  }
};