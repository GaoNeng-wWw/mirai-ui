<template>
  <div ref="contentRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { KEY, PopperContext } from './popper.props';

const name = 'MPopperContent';
defineOptions({ name });
const { trigger } = inject<PopperContext>(KEY)!;
// TODO: usePopper
</script>