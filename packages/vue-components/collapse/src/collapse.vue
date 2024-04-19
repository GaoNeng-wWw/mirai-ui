<template>
  <div :class="collapseWrapperStyle" :data-color="color" :data-size="size">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { collapse } from '@miraiui-org/theme';
import { collapseProps, CONSTANT } from './collapse.props';
import { computed, onMounted, provide, reactive, toRefs } from 'vue';
import { useDirty } from './useDirty';
const COMPONENT_NAME='MCollapse';
type Key = string|number|symbol;
defineOptions({
  name: COMPONENT_NAME
});
const emits = defineEmits<{
  open: [string|number|symbol];
  close: [string|number|symbol];
  beforeOpen: [string|number|symbol, ()=>void];
  beforeClose: [string|number|symbol, ()=>void]
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
const isDisabled = (key: string|number|symbol) => props.disabledKeys.includes(key);
const { isPreventClose, isPreventOpen, setPreventOpen, setPreventClose, cleanOpenPrevent, cleanClosePrevent } = useDirty();
const beforeOpen = (key: string | number | symbol) => {
  emits('beforeOpen', key, () => {
    setPreventOpen(key);
  });
};
const beforeClose = (key: string | number | symbol) => {
  emits('beforeClose', key, () => {
    setPreventClose(key);
  });
};
const open = (key: string|number|symbol) => {
  beforeOpen(key);
  if (isPreventOpen(key)) {
    cleanOpenPrevent(key);
    return;
  }
  if (isDisabled(key)) {
    return ;
  }
  let actived = [...modelValue.value];
  if (props.accordion) {
    if (!modelValue.value.includes(key)) {
      actived = [key];
    }
    modelValue.value = actived;
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
  beforeClose(key);
  if (isPreventClose(key)) {
    cleanClosePrevent(key);
    return;
  }
  if (isDisabled(key)) {
    return;
  }
  const actived = [...modelValue.value];
  const idx = actived.indexOf(key);
  if (idx > -1) {
    actived.splice(idx, 1);
  }
  modelValue.value = actived;
  emits('close', key);
};
const onItemClick = (key: string|number|symbol) => {
  if (modelValue.value.includes(key)) {
    close(key);
  } else {
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
  disabledKeys: toRefs(props.disabledKeys),
  onItemClick,
  open: (key: string | number | symbol) => open(key),
  close: (key: string | number | symbol) => close(key),
}));
</script>