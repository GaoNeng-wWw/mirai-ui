<template>
  <div class="relative">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import { KEY, PopperContext, PopperProp } from './popper.props';
import { unrefElement } from '@vueuse/core';

const props = defineProps(PopperProp);
const context: PopperContext = {
  trigger: ref(props.virtualTrigger ? props.triggerRef : undefined),
  content: ref(),
  safePoly: ref(),
  virtualTrigger: ref(props.virtualTrigger),
  placement: computed(() => props.placement),
  autoPlacement: computed(() => props.autoPlacement),
  offset: computed(() => props.offset),
  flip: computed(() => props.flip),
  middlewares: computed(() => props.middlewares),
  safepoly: computed(() => props.safepoly),
  safepolyDebug: computed(() => props.safepolyDebug)
};

provide(KEY, context);
onMounted(() => {
  watch(() => props.triggerRef, () => {
    if (props.triggerRef) {
      if (props.triggerRef instanceof HTMLElement || props.triggerRef instanceof SVGElement) {
        context.trigger.value = unrefElement(props.triggerRef);
      } else {
        context.trigger.value = props.triggerRef;
      }
    }
  }, { immediate:true });
});
</script>