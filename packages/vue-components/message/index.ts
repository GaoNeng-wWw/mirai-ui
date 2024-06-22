import type { App } from 'vue';
import Message from './src/message.vue';
import { useMessage } from './src/message';

export { Message, useMessage };

export default {
  name: 'Message',
  install: (app:App) => {
    app.component(Message.name!, Message);
  }
};