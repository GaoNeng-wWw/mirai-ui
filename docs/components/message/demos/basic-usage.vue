<template>
  <m-button @click="openMessage">
    Info
  </m-button>
  <div class="flex gap-4">
    <div class="flex items-center justify-center gap-1">
      <label>info</label>
      <input type="radio" v-model="messageType" value="info" />
    </div>
    <div class="flex items-center justify-center gap-1">
      <label>primary</label>
      <input type="radio" v-model="messageType" value="primary" />
    </div>
    <div class="flex items-center justify-center gap-1">
      <label>success</label>
      <input type="radio" v-model="messageType" value="success" />
    </div>
    <div class="flex items-center justify-center gap-1">
      <label>warning</label>
      <input type="radio" v-model="messageType" value="warning" />
    </div>
    <div class="flex items-center justify-center gap-1">
      <label>danger</label>
      <input type="radio" v-model="messageType" value="danger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button as MButton, useMessage, MessageType } from '@miraiui-org/vue-components';
import { ref } from 'vue';

const counter = ref(1);
const messageType = ref<MessageType>('info');
const openMessage = () => {
  useMessage({
    content: `Info-${counter.value++}`,
    type: messageType.value
  });
};
</script>