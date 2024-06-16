import type { App } from 'vue';
import Modal from './src/modal.vue';
import { useModal } from './src/useModal';

export { Modal, useModal };

export default {
  name: 'Modal',
  install: (app:App) => {
    app.component(Modal.name!, Modal);
  }
};