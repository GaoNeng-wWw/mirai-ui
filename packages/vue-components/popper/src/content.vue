<template>
  <div ref="contentRef" :style="floatingStyles">
    <div class="absolute" :class="{
      'bg-red-500':safepolyDebug
    }" ref="safePoly" v-if="safepoly"></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import { KEY, PopperContext } from './popper.props';
import { flip, offset, useFloating, autoUpdate, Middleware, autoPlacement } from '@floating-ui/vue';
import { useSafePoly } from './useSafepoly';

const name = 'MPopperContent';
defineOptions({ name });
const noop:Middleware = {
  fn: (state) => state,
  name: '',
  options: {}
};
const {
  trigger,
  safePoly,
  flip:useFlip,
  autoPlacement: useAutoPlacement,
  offset: offsetVal,
  middlewares,
  placement,
  safepoly,
  safepolyDebug
} = inject<PopperContext>(KEY)!;
const contentRef = ref();
const middleware = computed(() => [
  useFlip.value ? flip() : noop,
  useAutoPlacement.value ? autoPlacement() : noop,
  offset(offsetVal.value),
  useSafePoly(safePoly),
  ...middlewares.value
]);
const { floatingStyles, update } = useFloating(trigger, contentRef, {
  middleware,
  placement: placement.value,
  whileElementsMounted: autoUpdate
});
watch(() => trigger.value?.getBoundingClientRect(), (val) => {
  console.log(val);
  update();
});
</script>