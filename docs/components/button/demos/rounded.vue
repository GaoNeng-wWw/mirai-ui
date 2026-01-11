<script lang="ts" setup>
import { MButton, ButtonRounded } from '@miraiui-org/vue-core';

const sizes = 'xs|sm|md|lg|xl'.split('|') as ButtonRounded[];
</script>

<template>
  <div class="flex gap-4 flex-wrap items-center">
    <m-button v-for="size of sizes" :key="size" :rounded="size">
      按钮
    </m-button>
  </div>
</template>
