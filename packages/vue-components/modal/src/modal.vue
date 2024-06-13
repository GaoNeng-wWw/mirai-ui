<template>
  <m-mask>
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
          <m-button>
            取消
          </m-button>
          <m-button type="primary">
            确认
          </m-button>
        </slot>
      </div>
    </div>
  </m-mask>
</template>
<script setup lang="ts">
import { Mask as MMask } from '@miraiui-org/vue-mask';
import { Button as MButton } from '@miraiui-org/vue-button';
import { modalProps } from './modal.prop';
import { computed } from 'vue';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@miraiui-org/theme';
const COMPONENT_NAME='MModal';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(modalProps);
const className = computed(() => Modal(props));
const headerStyle = computed(() => ModalHeader());
const contentStyle = computed(() => ModalContent());
const footerStyle = computed(() => ModalFooter());
</script>