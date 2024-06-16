<template>
  <m-button @click="showModal">
    Open modal
  </m-button>
  <m-button @click="vnodeModal">
    Open modal (vnode)
  </m-button>
</template>

<script setup lang="ts">
import { Button as MButton, useModal } from '@miraiui-org/vue-components';
import { h } from 'vue';
const showModal = () => {
  useModal({
    title: 'Modal',
    content: 'Hello World!'
  });
};
const vnodeModal = () => {
  useModal({
    title: 'Modal',
    slots: {
      content: () => h('span', { class: 'text-danger' }, 'hello-world!')
    }
  });
};
</script>