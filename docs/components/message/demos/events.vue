<template>
  <m-button @click="openMessage">
    Info
  </m-button>
  <div class="w-full p-2 rounded-md bg-black mt-4">
    <p v-for="(log,idx) of logs" :key="idx">
      {{ log }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Button as MButton, useMessage, MessageType } from '@miraiui-org/vue-components';
import { ref } from 'vue';

const messageType = ref<MessageType>('info');
const logs = ref<string[]>([]);
const count = ref(0);
const openMessage = () => {
  useMessage({
    content: '1.5秒后关闭',
    type: messageType.value,
    duration: 1500,
    onClose: () => {
      logs.value.push(`message-${count.value++} 关闭`);
    },
  });
};
</script>