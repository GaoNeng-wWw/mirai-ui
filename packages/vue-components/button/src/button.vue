<template>
  <button :class="style" :data-loading="props.loading">
    <slot name="prefix">
      <loading-svg v-if="props.loading" />
    </slot>
    <slot />
  </button>
</template>
<script setup lang="ts">
import { button } from '@mirai-ui/theme';
import { computed, toRefs } from 'vue';
import { buttonProp } from './button.props';
import LoadingSvg from './loading.vue';
const COMPONENT_NAME='MButton';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(buttonProp);
const { type, shape } = toRefs(props);
const style = computed(() => button({ type: type.value, shape:shape.value }));
</script>