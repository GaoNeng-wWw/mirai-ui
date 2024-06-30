<template>
  <m-button @click="openMessage">
    Info
  </m-button>
</template>

<script setup lang="ts">
import { Button as MButton, useMessage, MessageType } from '@miraiui-org/vue-components';
import { ref } from 'vue';

const messageType = ref<MessageType>('info');
const openMessage = () => {
  useMessage({
    content: '1.5秒后关闭',
    type: messageType.value,
    duration: 1500
  });
};
</script>