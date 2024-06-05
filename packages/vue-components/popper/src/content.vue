<template>
  <div ref="contentRef" :style="floatingStyles">
    <div class=" w-8 h-8 bg-red-500 absolute" ref="safePoly"></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { KEY, PopperContext } from './popper.props';
import { flip, offset, useFloating, autoUpdate } from '@floating-ui/vue';
import { useSafePoly } from './useSafepoly';

const name = 'MPopperContent';
defineOptions({ name });
const { trigger, safePoly } = inject<PopperContext>(KEY)!;
const contentRef = ref();
const { floatingStyles } = useFloating(trigger, contentRef, {
  middleware:[
    flip(),
    offset(10),
    useSafePoly(safePoly),
  ],
  placement: 'top',
  whileElementsMounted: (trigger, content, update) => {
    const cleanup = autoUpdate(trigger, content, update, {
      animationFrame: true
    });
    return cleanup;
  },
});
</script>