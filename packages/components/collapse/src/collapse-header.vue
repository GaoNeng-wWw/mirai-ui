<script lang="ts" setup>
import { motion } from 'motion-v';
import { inject } from 'vue';
import { CollapseContextKey, CollapseItemKey } from './collapse.props';

const ctx = inject(CollapseContextKey)!;
const content = inject(CollapseItemKey)!;
</script>

<template>
  <motion.div :class="ctx.clazz.value.header" @click="ctx.collapse(content.id)">
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </motion.div>
</template>
