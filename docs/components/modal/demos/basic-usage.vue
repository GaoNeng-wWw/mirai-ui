<template>
  <Modal title="Modal" v-model="visible">
    <div><span>Hello world</span></div>
  </Modal>
  <m-button @click="visible = true">
    Toggle Visible
  </m-button>
</template>

<script lang="ts" setup>
import { Modal, Button as MButton } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
</script>