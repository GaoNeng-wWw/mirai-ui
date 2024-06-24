import type { App } from 'vue';
import Message from './src/message.vue';
import { useMessage } from './src/message';
import { MessageEvents, MessageHandle, MessageProps, MessageType } from './src/message.prop';

export { Message, useMessage };
export type { MessageEvents, MessageHandle, MessageProps, MessageType };

export default {
  name: 'Message',
  install: (app:App) => {
    app.component(Message.name!, Message);
  }
};