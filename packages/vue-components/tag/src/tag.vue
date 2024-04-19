<template>
  <div :class="style">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { tag } from '@mirai-ui/theme';
import { tagProps } from './tag.props';
import { computed } from 'vue';
const COMPONENT_NAME='MTag';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(tagProps);
const style = computed(() => tag({
  color: props.colors,
  size: props.size
}));
</script>