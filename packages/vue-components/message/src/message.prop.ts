import { ExtractPropTypes, PropType, VNode as _Vnode } from 'vue';

type VNode = _Vnode

export type MessageHandle = {
  close: () => void
}

export type MessageEvents = {
  onClose: ()=>void
}

export type MessageType = 'info' | 'success' | 'warning' | 'danger' | 'primary';

export const messageProps = {

  /**
   * @description {zh} message内容, 允许使用vnode
   * @description {en} content of message, allow vnode
   * @demo {zh} #基本使用
   */
  content: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },

  /**
   * @description {zh} message主题
   * @description {en} theme of message
   * @demo {zh} #基本使用
   */
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },

  /**
   * @description {zh} 前一个message与后一个message之间的间距, 如果只有一个message则表示为当前message上边缘与窗口的间距
   * @description {en} The distance between the previous message and the next message, if there is only one message, it is represented as the distance between the upper edge of the current message and the window
   * @demo {zh} #基本使用
   */
  gap: {
    type: Number,
    default: 16
  },

  /**
   * @description {zh} 指定message添加到那个元素内, 默认为 body
   * @description {en} Specify which element to add a message to, default to body
   */
  appendTo: {
    type: String,
    default: 'body'
  },

  /**
   * @description {zh} message id, 一般自动生成
   * @description {en} message id,  Generally generated automatically
   */
  id: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 当message被关闭时触发的事件
   * @description {en} Event triggered when message is closed
   * @demo {zh} #事件
   */
  onClose: {
    type: Function as PropType<MessageEvents['onClose']>
  },

  /**
   * @description {zh} 当message被销毁时触发的事件
   * @description {en} Event triggered when a message is destroyed
   * @demo {zh} #事件
   */
  onDestory: {
    type:Function
  },

  /**
   * @description {zh} message关闭事件
   * @description {en} Message close event
   * @demo {zh} #关闭时间
   */
  duration: {
    type: Number,
    default: 2000
  }
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;