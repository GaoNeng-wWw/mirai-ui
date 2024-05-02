<template>
  <div>
    <div ref="reference" class="w-fit"
      @mouseenter="open"
      @mouseleave="close"
      @click="onClick"
      @focus="open"
      @blur="close"
      @contextmenu="onClick"
      :tabindex=0
    >
      <slot name="reference" />
    </div>
    <div ref="floating" class="w-fit z-10" :style="floatingStyles"
      @mouseenter="open"
      @mouseleave="close"
    >
      <slot name="floating" v-if="visible" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  useFloating,
  autoPlacement as AutoPlacement,
  offset as middlewareOffset,
  autoUpdate,
  flip as Flip,
  Middleware,
  shift as Shift,
} from '@floating-ui/vue';
import { computed, ref, toRefs } from 'vue';
import { PopperEvent, PopperProps } from './popper.props';
import { useTrigger } from './useTrigger';

const COMPONENT_NAME='MPopper';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(PopperProps);
const { 
  autoPlacement,
  placement,
  offset,
  flip,
  flipOption,
  shift,
  shiftOption,
  externalMiddleware,
} = toRefs(props);
const reference = ref<null | HTMLElement>(null);
const floating = ref<null | HTMLElement>(null);
const emptyMiddleware:Middleware = {
  name: 'noop',
  options: {},
  fn:(state) => state
};
const emit = defineEmits<{
  beforeOpen: [PopperEvent],
  afterOpen: [PopperEvent],
  beforeClose: [PopperEvent],
  afterClose: [PopperEvent]
}
>();
const middlewares = computed(() => [
  autoPlacement.value ? AutoPlacement() : emptyMiddleware,
  middlewareOffset(offset.value),
  flip.value ? Flip(flipOption.value) : emptyMiddleware,
  shift.value ? Shift(shiftOption.value) : emptyMiddleware,
  ...externalMiddleware.value,
]);
const { open, close, onClick, visible } = useTrigger(props, emit);
const { floatingStyles } = useFloating(reference, floating, {
  open: visible,
  middleware: middlewares,
  whileElementsMounted: autoUpdate,
  placement,
  transform: false,
});

</script>