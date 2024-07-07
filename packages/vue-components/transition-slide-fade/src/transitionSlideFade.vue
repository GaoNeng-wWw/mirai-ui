<template>
  <transition 
    :name="transitionName"
    appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>
<script setup lang="ts">
import { computed, RendererElement, toRefs } from 'vue';
import { transitionSlideFadeProps } from './transition-slide-fade.props';

const COMPONENT_NAME='MTransitionSlideFade';
defineOptions({
  name: COMPONENT_NAME
});
const props = toRefs(defineProps(transitionSlideFadeProps));
const transitionName = computed(() => `fade-slide-${props.from.value}-${props.to.value}`);
const offset = computed(() => `${props.offset.value}px`);

const onBeforeEnter = (el: RendererElement) => {
  
};
const onEnter = () => {};
const onBeforeLeave = () => {};
const onLeave = () => {};

</script>

<style>
.fade-slide-top-top-enter-active,
.fade-slide-top-bottom-enter-active,
.fade-slide-top-left-enter-active,
.fade-slide-top-right-enter-active,
.fade-slide-right-top-enter-active,
.fade-slide-right-bottom-enter-active,
.fade-slide-right-left-enter-active,
.fade-slide-right-right-enter-active,
.fade-slide-bottom-top-enter-active,
.fade-slide-bottom-bottom-enter-active,
.fade-slide-bottom-left-enter-active,
.fade-slide-bottom-right-enter-active,
.fade-slide-left-top-enter-active,
.fade-slide-left-bottom-enter-active,
.fade-slide-left-left-enter-active,
.fade-slide-left-right-enter-active,
.fade-slide-top-top-leave-active,
.fade-slide-top-bottom-leave-active,
.fade-slide-top-left-leave-active,
.fade-slide-top-right-leave-active,
.fade-slide-right-top-leave-active,
.fade-slide-right-bottom-leave-active,
.fade-slide-right-left-leave-active,
.fade-slide-right-right-leave-active,
.fade-slide-bottom-top-leave-active,
.fade-slide-bottom-bottom-leave-active,
.fade-slide-bottom-left-leave-active,
.fade-slide-bottom-right-leave-active,
.fade-slide-left-top-leave-active,
.fade-slide-left-bottom-leave-active,
.fade-slide-left-left-leave-active,
.fade-slide-left-right-leave-active{
  transition:
    opacity theme('transitionDuration.fast') ease-in-out,
    transform theme('transitionDuration.fast') ease-in-out;
}

.fade-slide-top-top-enter-from,
.fade-slide-top-top-leave-to {
  transform: translateY(calc(v-bind('offset') * -1));
  opacity: 0;
}
.fade-slide-top-top-enter-to,
.fade-slide-top-top-leave-from {
  transform: translateY(0px);
  opacity: 1;
}

.fade-slide-top-bottom-enter-from,
.fade-slide-top-bottom-leave-to {
  transform: translateY(v-bind('offset'));
  opacity: 0;
}
.fade-slide-top-bottom-enter-to,
.fade-slide-top-bottom-leave-from {
  transform: translateY(0px);
  opacity: 1;
}

.fade-slide-top-left-enter-from,
.fade-slide-top-left-leave-to {
  transform: translateX(calc(v-bind('offset') * -1));
  opacity: 0;
}
.fade-slide-top-left-enter-to,
.fade-slide-top-left-leave-from {
  transform: translateX(0px);
  opacity: 1;
}


</style>