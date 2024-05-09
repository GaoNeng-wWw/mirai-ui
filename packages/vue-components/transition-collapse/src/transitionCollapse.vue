
<template>
  <transition v-on="events" class=" transition-all duration-[2000ms]">
    <slot />
  </transition>
</template>
<script setup lang="ts">
import { useCollapse } from './useCollapse';

const COMPONENT_NAME='MTransitionCollapse';
defineOptions({
  name: COMPONENT_NAME
});
const { events } = useCollapse();
</script>