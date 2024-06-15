<script setup lang="ts">
import { Mask as MMask } from '@miraiui-org/vue-mask';
import { Button as MButton } from '@miraiui-org/vue-button';
import { modalProps } from './modal.prop';
import { computed, watch } from 'vue';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@miraiui-org/theme';
import { useVisible } from '@miraiui-org/vue-hooks';
const COMPONENT_NAME='MModal';
const modelValue = defineModel<boolean>({ default: false, required: true });
const emits = defineEmits<{
  open: [],
  close: [],
  toggle: [],
  ok: [],
  cancel: []
}>();
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(modalProps);
const className = computed(() => Modal(props));
const headerStyle = computed(() => ModalHeader());
const contentStyle = computed(() => ModalContent());
const footerStyle = computed(() => ModalFooter());
const { visible, open, close, onOpen, onClose } = useVisible(modelValue);
onOpen(() => {
  emits('open');
});
onClose(() => {
  emits('close');
});
const handleOk = () => {
  emits('close');
  emits('ok');
  close();
};
const handleCancel = () => {
  emits('close');
  emits('cancel');
  close();
};
watch(modelValue, () => {
  if (modelValue.value) {
    open();
  } else {
    close();
  }
});
</script>

<template>
  <teleport to="body">
    <transition name="modal-transition">
      <m-mask v-if="visible" @click="handleCancel">
        <div :class="className" :style="{
          'width': `${props.width ? `${props.width}px` : '300px'}`
        }">
            <div :class="headerStyle">
              <span>
                <slot name="header">
                  {{ props.title }}
                </slot>
              </span>
            </div>
          <div :class="contentStyle">
            <slot>
              {{ props.content }}
            </slot>
          </div>
          <div :class="footerStyle">
            <slot name="footer">
              <m-button @click="handleCancel">
                取消
              </m-button>
              <m-button type="primary" @click="handleOk">
                确认
              </m-button>
            </slot>
          </div>
        </div>
      </m-mask>
    </transition>
  </teleport>
</template>

<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes zoom {
  0% {
    scale: 2;
  }
  100% {
    scale: 1;
  }
}
.modal-transition-enter-active.mask{
  animation: fadeIn theme('transitionTimingFunction.epic') theme('transitionDuration.fast');
}
.modal-transition-leave-active.mask{
  animation: fadeIn theme('transitionTimingFunction.epic') theme('transitionDuration.fast') reverse;
}
.modal-transition-enter-active .modal{
  animation: zoom  theme('transitionTimingFunction.epic') theme('transitionDuration.fast');
}
.modal-transition-leave-active .modal{
  animation: zoom theme('transitionTimingFunction.epic') theme('transitionDuration.fast') reverse;
}
</style>