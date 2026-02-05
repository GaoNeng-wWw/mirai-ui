<script lang="ts" setup>
import { motion } from 'motion-v';
import { computed, inject } from 'vue';
import { CollapseContextKey, CollapseItemKey } from './collapse.props';

const ctx = inject(CollapseContextKey)!;
const content = inject(CollapseItemKey)!;
const isDisabled = computed(() => ctx.disabled?.value.includes(content.id) || undefined);
</script>

<template>
  <motion.div :class="ctx.clazz.value.header" :data-disabled="isDisabled" @click="ctx.collapse(content.id)">
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </motion.div>
</template>
