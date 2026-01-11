<script lang="ts" setup>
import { MButton, ButtonColor } from '@miraiui-org/vue-core';
import { ref } from 'vue';

const colors = 'primary|secondary|success|warning|danger'.split('|').map(val => val.trim()).map(val => val as ButtonColor);
const loading = ref('');

const onClick = (
  color: string,
) => {
  loading.value = color;
};
</script>

<template>
  <div class="flex gap-4 flex-wrap">
    <m-button v-for="color in colors" :key="color" variant="solid" :color="color" :loading="loading === color" @click="onClick(color)">
      按钮
    </m-button>
  </div>
</template>
