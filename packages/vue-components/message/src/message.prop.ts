import { ExtractPropTypes, PropType, VNode } from 'vue';

export type MessageHandle = {
  close: () => void
}

export type MessageEvents = {
  onClose: ()=>void
}

export type MessageType = 'info' | 'success' | 'warning' | 'danger';

export const messageProps = {
  content: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  gap: {
    type: Number,
    default: 16
  },
  appendTo: {
    type: String,
    default: 'body'
  },
  id: {
    type: String,
    default: ''
  },
  onClose: {
    type: Function as PropType<MessageEvents['onClose']>
  }
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;