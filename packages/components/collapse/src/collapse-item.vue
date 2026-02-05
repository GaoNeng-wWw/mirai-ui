<script lang="ts" setup>
import { motion } from 'motion-v';
import { computed, inject, provide, toValue } from 'vue';
import { CollapseContextKey, CollapseItemKey, CollapseItemProps } from './collapse.props';

const props = defineProps<CollapseItemProps>();

const ctx = inject(CollapseContextKey)!;

const clazz = computed(() => toValue(ctx.clazz).item);

provide(CollapseItemKey, { id: props.id });
</script>

<template>
  <motion.div :class="clazz" layout>
    <slot />
  </motion.div>
</template>
