import type { App } from 'vue';
import Modal from './src/modal.vue';

export { Modal };

export default {
  name: 'Modal',
  install: (app:App) => {
    app.component(Modal.name!, Modal);
  }
};