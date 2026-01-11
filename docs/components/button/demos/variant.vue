<script lang="ts" setup>
import { MButton, ButtonVariant } from '@miraiui-org/vue-core';

const variants: ButtonVariant[] = ['solid', 'ghost', 'flat', 'outline'];
</script>

<template>
  <div class="flex gap-4 flex-wrap items-center">
    <m-button v-for="variant of variants" :key="variant" :variant="variant">
      {{ variant }}
    </m-button>
  </div>
</template>
