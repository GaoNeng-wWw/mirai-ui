<template>
  <transition 
    appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    name="fade-slide"
  >
    <slot />
  </transition>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { transitionSlideFadeProps } from './transition-slide-fade.props';
import { useSlideTransition } from './useSlideTransition';

const COMPONENT_NAME='MTransitionSlideFade';
defineOptions({
  name: COMPONENT_NAME
});

const rawProps = defineProps(transitionSlideFadeProps);
const props = toRefs(rawProps);
const { onBeforeEnter, onEnter, onLeave } = useSlideTransition(props);

</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity theme('transitionDuration.fast') ease-in-out,
    transform theme('transitionDuration.fast') ease-in-out;
  will-change: auto;
}
</style>