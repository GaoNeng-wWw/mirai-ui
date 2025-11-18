<script lang="ts" setup>
import { ButtonSized, MButton } from '@miraiui-org/vue-core';

const sizes: ButtonSized[] = ['xs', 'sm', 'md', 'lg', 'xl'];
</script>

<template>
  <div class="w-full h-fit space-x-4 p-4">
    <m-button v-for="size of sizes" :key="size" :size="size">
      Size - {{ size }}
    </m-button>
  </div>
</template>
