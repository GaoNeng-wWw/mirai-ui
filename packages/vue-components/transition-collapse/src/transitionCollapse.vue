
<template>
  <transition
    @before-enter="events.onBeforeEnter"
    @enter="events.onEnter"
    @after-enter="events.onAfterEnter"
    @before-leave="events.onBeforeLeave"
    @leave="events.onLeave"
    @enter-cancelled="events.onEnterCancelled"
    @leave-cancelled="events.onLeaveCancelled"
    @after-leave="events.onAfterLeave"
    class="transition-all duration-normal ease-in-out"
  >
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