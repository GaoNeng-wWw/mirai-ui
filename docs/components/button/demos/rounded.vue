<script lang="ts" setup>
import { ButtonRounded, MButton } from '@miraiui-org/vue-core';

const sizes: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
</script>

<template>
  <div class="w-full h-fit flex gap-2 flex-wrap py-4">
    <m-button v-for="size of sizes" :key="size" :rounded="size">
      {{ size }}
    </m-button>
  </div>
</template>
