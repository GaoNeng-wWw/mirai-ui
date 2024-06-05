<template>
  <div class="relative">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { KEY, PopperContext, PopperProp } from './popper.props';

const props = defineProps(PopperProp);
const [modelValue] = defineModel<boolean>();
const context: PopperContext = {
  trigger: ref(),
  content: ref(),
  safePoly: ref(),
  visible: modelValue,
  virtualTrigger: ref(props.virtualTrigger)
};

provide(KEY, context);

</script>