<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { KEY, PopperContext, PopperProp } from './popper.props';

const props = defineProps(PopperProp);
const context: PopperContext = {
  trigger: ref(props.virtualTrigger ? props.triggerRef : undefined),
  content: ref(),
  visible: ref(),
  virtualTrigger: ref(props.virtualTrigger)
};

provide(KEY, context);

</script>