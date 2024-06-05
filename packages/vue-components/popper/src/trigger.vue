<template>
  <child-only v-if="!virtualTrigger" v-bind="$attrs">
    <slot />
  </child-only>
</template>

<script setup lang="ts">
import { ChildOnly } from '@miraiui-org/vue-helper';
import { inject, onMounted, watch } from 'vue';
import { KEY, PopperContext } from './popper.props';
import { useForwardRef } from '@miraiui-org/hooks';
const name = 'MPopperTrigger';

defineOptions({ name, inheritAttrs: false });
const emits = defineEmits<{
  click: [e: Event],
  contextMenu: [e: Event],
  focus: [e: Event],
  blur: [e :Event],
  mouseEnter: [e: Event],
  mouseLeave: [e: Event]
}>();
const { virtualTrigger, trigger } = inject<PopperContext>(KEY)!;
useForwardRef(trigger);
onMounted(() => {
  watch(trigger, (el) => {
    ([
      'mouseEnter',
      'mouseLeave',
      'click',
      'focus',
      'blur',
      'contextMenu',
    ] as const)
      .forEach((name) => {
        el?.addEventListener(name.toLowerCase(), (ev) => {
          emits(name as any, ev);
        });
      });
  }, { immediate: true });
});
</script>