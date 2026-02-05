<script lang="ts" setup>
import { motion } from 'motion-v';
import { CollapseContextKey, CollapseKey, CollapseProps } from './collapse.props';
import { computed, provide } from 'vue';
import { collapse as Collapse } from '@miraiui-org/theme';

const {
  accordion = false,
  size = 'md',
} = defineProps<CollapseProps>();

const modelValue = defineModel<CollapseKey[]>({ default: [] });

const currentActive = computed(() => modelValue.value);
const collapse = (val: CollapseKey) => {
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
    base: base(),
    content: content(),
    item: item(),
    header: header(),
  };
});

provide(CollapseContextKey, { currentActive, collapse, clazz });
</script>

<template>
  <motion.div layout :class="clazz.base">
    <slot />
  </motion.div>
</template>
