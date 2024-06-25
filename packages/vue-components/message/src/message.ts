import { useCounter } from '@vueuse/core';
import { MessageProps } from './message.prop';
import { createVNode, isVNode, render } from 'vue';
import { isFunction, isString } from '@miraiui-org/vue-hooks';

import Message from './message.vue';
import { InstanceContext, instances } from './instance';


const id = useCounter();

const DEFAULT: MessageProps = {
  content: '',
  type: 'info',
  gap: 16,
  appendTo: 'body',
  id: '',
  onClose: () => {},
  duration: 3000,
} as const;

const closeMessage = (instance:InstanceContext) => {
  const idx = instances.indexOf(instance);
  if (idx === -1) {
    return;
  }
  instances.splice(idx, 1);
  instance.handle.close();
};

export const useMessage = (
  options: Partial<MessageProps>
) => {
  const userClose = options.onClose;
  const props:MessageProps = {
    ...DEFAULT,
    ...options,
    id: `message-${id.inc()}`,
    onClose: () => {
      userClose?.();
      closeMessage(instance);
    },
    onDestory: () => {
      render(null, container);
    }
  };
  const container = document.createElement('div');
  const vnode = createVNode(
    Message,
    props,
    isFunction(props.content) || isVNode(props.content) ? {
      default: isFunction(props.content) ? props.content : () => props.content
    } : null
  );
  const close = () => {
    vnode.component!.exposed!.visible.value = false;
  };
  render(vnode, container);
  const instance: InstanceContext = {
    id: props.id,
    vm: vnode.component!,
    handle: {
      close,
    }
  };
  instances.push(instance);
  const appendTo = isString(options.appendTo) ? document.querySelector(options.appendTo) ?? document.body : document.body;
  appendTo.appendChild(container.firstElementChild!);
  return instance.handle;
};