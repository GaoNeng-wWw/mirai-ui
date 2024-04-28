<template>
  <div>
    <div ref="reference" class="w-fit">
      <slot name="reference" />
    </div>
    <div ref="floating" v-if="show" class="w-fit" :style="floatingStyles">
      <slot name="floating" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFloating, offset as middlewareOffset, autoUpdate } from '@floating-ui/vue';
import { ref, toRefs } from 'vue';
import { PopperProps } from './popper.props';

const COMPONENT_NAME='MPopper';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(PopperProps);
const { show, placement, offset } = toRefs(props);
const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  open: show,
  middleware: [
    middlewareOffset(offset.value),
  ],
  whileElementsMounted: autoUpdate,
  placement,
});
</script>