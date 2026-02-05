<script lang="ts" setup>
import { motion } from 'motion-v';
import { CollapseContextKey, CollapseKey, CollapseProps } from './collapse.props';
import { computed, provide, watch } from 'vue';
import { collapse as Collapse } from '@miraiui-org/theme';

const {
  accordion = false,
  size = 'md',
  disabled = [],
  pure = false,
} = defineProps<CollapseProps>();

const emits = defineEmits<{
  change: [CollapseKey[]];
}>();

const modelValue = defineModel<CollapseKey[]>({ default: [] });

const currentActive = computed(() => modelValue.value);
const collapse = (val: CollapseKey) => {
  if (disabled.includes(val)) {
    return;
  }
  if (!modelValue.value.includes(val)) {
    if (accordion) {
      modelValue.value = [val];
      return;
    }
    modelValue.value.push(val);
    return;
  }
  modelValue.value = modelValue.value.filter(k => k !== val);
};

const clazz = computed(() => {
  const { base, content, item, header } = Collapse({ size });
  return {
    base: pure ? '' : base(),
    content: pure ? '' : content(),
    item: pure ? '' : item(),
    header: pure ? '' : header(),
  };
});

provide(CollapseContextKey, { currentActive, collapse, clazz, disabled: computed(() => disabled) });

watch(modelValue, () => {
  emits('change', modelValue.value);
}, { deep: true });
</script>

<template>
  <motion.div layout :class="clazz.base">
    <slot />
  </motion.div>
</template>
