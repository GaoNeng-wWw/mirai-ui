import { Component, h, render, VNode } from 'vue';
import { ModalProps } from './modal.prop';
import Modal from './modal.vue';

export interface ModalHookOptions extends ModalProps {
  slots: Partial<{
    content: VNode | (() => VNode),
    footer: VNode | (() => VNode),
    header: VNode | (() => VNode),
  }>
}

export const useModal = (props: Partial<ModalHookOptions>) => {
  const anchor = document.createElement('div');
  const { slots, ...rawProps } = props;
  const modal = h(Modal as Component<ModalProps>, {
    title: '',
    content: '',
    rounded: 'md',
    width: 0,
    modelValue: true,
    ...rawProps
  }, {
    default: slots?.content,
    header: slots?.header,
    footer: slots?.footer
  });
  render(modal, anchor);
  const modalContainer = document.body.appendChild(anchor);
  return () => {
    if (document.body.contains(modalContainer)) {
      modalContainer.remove();
    }
    return true;
  };
};