<script setup lang="ts">
import { MaskType, Modal as MModal, Button as MButton } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
const maskType: MaskType = 'blur';
</script>
<template>
  <m-modal v-model="visible" :mask-type="maskType" title="Custom mask type">
    <m-button @click="visible = false">
      关闭遮罩
    </m-button>
  </m-modal>
  <m-button @click="visible=true">
    打开遮罩
  </m-button>
</template>