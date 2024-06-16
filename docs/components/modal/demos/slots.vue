<script lang="ts" setup>
import { Modal as MModal, Button as MButton } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
  <m-modal title="Modal" v-model="visible">
    <template #header>
      <span class="text-2xl">Modal</span>
    </template>
    <div>
      <span class="text-danger">hello world!</span>
    </div>
    <template #footer="{cancel}">
      <m-button type="danger" size="sm" @click="cancel">
        Close
      </m-button>
    </template>
  </m-modal>
  <m-button @click="visible = true">
    Show Modal
  </m-button>
</template>