<script lang="ts" setup>
import { motion, AnimatePresence } from 'motion-v';
import { computed, inject, toValue } from 'vue';
import { CollapseContextKey, CollapseItemKey } from './collapse.props';

const ctx = inject(CollapseContextKey)!;
const content = inject(CollapseItemKey)!;

const clazz = computed(() => toValue(ctx.clazz).content);
</script>

<template>
  <animate-presence>
    <motion.div
      v-if="ctx.currentActive.value.includes(content.id)"
      :initial="{ height: 0, opacity: 0 }"
      :animate="{ height: 'auto', opacity: 1 }"
      :exit="{ height: 0, opacity: 0 }"
      class="overflow-hidden"
    >
      <motion.div :class="clazz">
        <slot />
      </motion.div>
    </motion.div>
  </animate-presence>
</template>
