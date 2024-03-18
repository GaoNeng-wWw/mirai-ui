<template>
  <button :class="style">
    <slot />
  </button>
</template>
<script setup lang="ts">
import { button } from '@mirai-ui/theme';
import { computed, toRefs } from 'vue';
import { buttonProp } from './button.props';
const COMPONENT_NAME='MButton';
defineOptions({
  name: COMPONENT_NAME
});
// defineEmits(['press', 'click', 'dbClick']);

const props = defineProps(buttonProp);
const { type, shape } = toRefs(props);
const style = computed(() => button({ type: type.value, shape:shape.value }));
</script>