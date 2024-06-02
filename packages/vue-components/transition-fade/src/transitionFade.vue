<template>
  <transition name="fade" class="transition duration-normal ease-in-out"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>
<script setup lang="ts">
import { RendererElement } from 'vue';

const COMPONENT_NAME='MTransitionFade';
defineOptions({
  name: COMPONENT_NAME
});
const beforeEnter = (el: RendererElement) => el.style.opacity = '0';
const onEnter = (el: RendererElement) => {
  requestAnimationFrame(() => {
    el.style.opacity = '1';
  });
};
const beforeLeave = (el: RendererElement) => {
  el.style.opacity = '1';
};
const onLeave = (el: RendererElement) => el.style.opacity = '0';
</script>