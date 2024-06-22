<template>
  <m-button @click="openMessage">
    Info
  </m-button>
</template>

<script setup lang="ts">
import { Button as MButton, useMessage } from '@miraiui-org/vue-components';
const openMessage = () => {
  useMessage({
    content: 'Info'
  });
};
</script>