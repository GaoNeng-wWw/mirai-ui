<script lang="ts" setup>
import { m } from 'motion-v';
import { button } from '@miraiui-org/theme';
import { ButtonProps } from './button.props';
import { computed } from 'vue';

const props = defineProps<ButtonProps>();

const clazz = computed(() => button(props));
</script>

<template>
  <m.button :class="clazz" :type="props.htmlType" layout>
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </m.button>
</template>
