
import type { App } from 'vue';
import Button from './src/button.vue';

export { Button };
export * from './src/button.props';

export default {
  name: 'Button',
  install: (app:App) => {
    app.component(Button.name!, Button);
  }
};
    