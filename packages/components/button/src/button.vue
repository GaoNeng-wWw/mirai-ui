<script lang="ts" setup>
import { motion, AnimatePresence } from 'motion-v';
import { button } from '@miraiui-org/theme';
import { ButtonProps } from './button.props';
import loading from './loading.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'solid',
    color: 'primary',
    htmlType: 'button',
    size: 'md',
    rounded: 'md',
  },
);

const isDisabled = computed(() => props.disabled || props.loading);

const clazz = computed(() => button({ ...props, disabled: isDisabled.value }));
</script>

<template>
  <motion.button :class="clazz" :type="props.htmlType" layout="position">
    <slot name="prefix">
      <slot name="loading">
        <animate-presence>
          <motion.div
            v-if="props.loading"
            layout
            class="w-4 h-4 animate-spin"
            :initial="{ scale: 0, width: 0, opacity: 0, marginRight: 0 }"
            :animate="{ scale: 1, width: '1rem', opacity: 1, marginRight: '0.5rem' }"
            :exit="{ scale: 0, width: 0, opacity: 0, marginRight: 0 }"
            :transition="{ type: 'spring' }"
          >
            <loading />
          </motion.div>
        </animate-presence>
      </slot>
    </slot>
    <motion.div>
      <slot />
    </motion.div>
    <motion.div>
      <slot name="suffix" />
    </motion.div>
  </motion.button>
</template>
