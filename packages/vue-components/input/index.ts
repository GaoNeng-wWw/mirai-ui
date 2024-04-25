
import type { App } from 'vue';
import Input from './src/input.vue';

export * from './src/input.props';

export { Input };

export default {
  name: 'Input',
  install: (app:App) => {
    app.component(Input.name!, Input);
  }
};