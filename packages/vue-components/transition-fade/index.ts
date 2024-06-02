
import type { App, Transition } from 'vue';
import TransitionFade from './src/transitionFade.vue';

const _transitionFade = TransitionFade as typeof TransitionFade & typeof Transition;

export { _transitionFade as TransitionFade };

export default {
  name: 'TransitionFade',
  install: (app:App) => {
    app.component(TransitionFade.name!, TransitionFade);
  }
};