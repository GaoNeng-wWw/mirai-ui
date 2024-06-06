<template>
  <div class="relative">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { KEY, PopperContext, PopperProp } from './popper.props';

const props = defineProps(PopperProp);
const context: PopperContext = {
  trigger: ref(),
  content: ref(),
  safePoly: ref(),
  virtualTrigger: ref(props.virtualTrigger)
};

provide(KEY, context);

</script>