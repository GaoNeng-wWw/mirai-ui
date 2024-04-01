<template>
  <div :class="collapseWrapperStyle" :data-color="color" :data-size="size">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { collapse } from '@mirai-ui/theme';
import { collapseProps } from './collapse.props';
import { computed, toRefs } from 'vue';
const COMPONENT_NAME='MCollapse';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(collapseProps);
const { size, radius, color } = toRefs(props);
const collapseWrapperStyle = computed(() => collapse({
  size: size.value,
  radius: radius.value
}));
</script>