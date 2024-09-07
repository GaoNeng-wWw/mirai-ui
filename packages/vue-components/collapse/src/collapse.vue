<template>
  <div :class="collapseWrapperStyle" :data-color="color" :data-size="size">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { collapse } from '@miraiui-org/theme';
import { collapseProps, CONSTANT } from './collapse.props';
import { computed, onMounted, provide, reactive, ref, toRefs } from 'vue';
const COMPONENT_NAME='MCollapse';
export type Key = string|number|symbol;
defineOptions({
  name: COMPONENT_NAME
});
const emits = defineEmits<{
  open: [string|number|symbol];
  close: [string|number|symbol];
}>();

const modelValue = defineModel<Key[]>({
  required: true,
  default: [],
});
const props = defineProps(collapseProps);
const { size, radius, color } = toRefs(props);
const collapseWrapperStyle = computed(() => collapse({
  size: size.value,
  radius: radius.value
}));
const collapseItemDisabledKeys = ref<Key[]>([]);
const disabledKeys = computed(() => [...props.disabledKeys, ...collapseItemDisabledKeys.value]);
const isDisabled = (key: string|number|symbol) => disabledKeys.value.includes(key);
const open = (key: string|number|symbol) => {
  let actived = [...modelValue.value];
  if (props.accordion) {
    if (!modelValue.value.includes(key)) {
      actived = [key];
    }
    modelValue.value = actived;
    emits('open', key);
    return;
  }
  const idx = actived.indexOf(key);
  if (idx > -1) {
    return;
  } 
  actived.push(key);
  modelValue.value = actived;
  emits('open', key);
};
const close = (key: string | number | symbol) => {
  const actived = [...modelValue.value];
  if (props.accordion) {
    if (modelValue.value.includes(key)) {
      modelValue.value = modelValue.value.filter((v) => v !== key);
    }
    return;
  }
  const idx = actived.indexOf(key);
  if (idx > -1) {
    actived.splice(idx, 1);
  }
  modelValue.value = actived;
  emits('close', key);
};
const onItemClick = (key: string|number|symbol) => {
  if (isDisabled(key)) {
    return;
  }
  if (modelValue.value.includes(key)) {
    if (props.onBeforeClose) {
      props.onBeforeClose?.(key, () => {
        close(key);
      });
      return;
    }
    close(key);
  } else {
    if (props.onBeforeOpen) {
      props.onBeforeOpen?.(key, () => {
        open(key);
      });
      return;
    }
    open(key);
  }
};
onMounted(() => {
  if (props.allowInitOpenEvent) {
    modelValue.value.forEach((key) => {
      emits('open', key);
    });
  }
});
provide(CONSTANT, reactive({
  modelValue: modelValue,
  disabledKeys,
  onItemClick,
  open: (key: string | number | symbol) => open(key),
  close: (key: string | number | symbol) => close(key),
  collapseItemDisabledKeys
}));

defineExpose({
  getDisabledKeys:() => disabledKeys.value
});

</script>