import type { App } from 'vue';
import { Transition } from 'vue';
import TransitionCollapse from './src/transitionCollapse.vue';

const _transitionCollapse = TransitionCollapse as typeof TransitionCollapse & typeof Transition;

export { _transitionCollapse as TransitionCollapse };


export default {
  name: 'TransitionCollapse',
  install: (app:App) => {
    app.component(TransitionCollapse.name!, _transitionCollapse);
  }
};
    