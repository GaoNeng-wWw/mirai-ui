<template>
  <div :class="collapseWrapperStyle" :data-color="color" :data-size="size">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { collapse } from '@mirai-ui/theme';
import { collapseProps, CONSTANT } from './collapse.props';
import { computed, provide, reactive, toRefs } from 'vue';
const COMPONENT_NAME='MCollapse';
defineOptions({
  name: COMPONENT_NAME
});
const modelValue = defineModel<(string|number|symbol)[]>({
  required: true,
  default: [],
});
const props = defineProps(collapseProps);
const { size, radius, color } = toRefs(props);
const collapseWrapperStyle = computed(() => collapse({
  size: size.value,
  radius: radius.value
}));

const onItemClick = (key: string|number|symbol) => {
  if (props.disabledKeys.includes(key)) {
    return;
  }
  const actived = [...modelValue.value];
  if (props.accordion) {
    modelValue.value = actived.filter((activeKey) => activeKey === key);
    return;
  }
  const idx = actived.indexOf(key);
  if (idx > -1 ) {
    actived.splice(idx, 1);
  } else {
    actived.push(key);
  }
  modelValue.value = actived;
};
provide(CONSTANT, reactive({
  modelValue: modelValue,
  disabledKeys: toRefs(props.disabledKeys),
  onItemClick
}));

</script>