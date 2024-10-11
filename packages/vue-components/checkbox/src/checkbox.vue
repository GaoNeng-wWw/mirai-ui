<template>
  <label for="" :class="checkboxWrapperStyle">
    <span :class="checkboxStyle" :data-checked="modelValue" @click="onClick">
      <slot>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
          >
          <path
            :data-visible="modelValue"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
            stroke="currentColor"
            stroke-dasharray="200"
            :class="checkIconStyle"

          />
        </svg>
      </slot>
    </span>
    <span v-if="label">{{ label }}</span>
  </label>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { checkboxProp } from './checkbox.props';
import { checkbox, checkboxWrapper, checkIcon } from '@miraiui-org/theme';

const COMPONENT_NAME='MCheckbox';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(checkboxProp);
const { disabled, indeterminate, variant } = toRefs(props);
const modelValue = defineModel<boolean>();
const checkboxStyle=computed(() => checkbox({ disabled: disabled.value, indeterminate:indeterminate.value, variant: variant.value }));
const checkboxWrapperStyle=computed(() => checkboxWrapper({ disabled: disabled.value, indeterminate:indeterminate.value }));
const checkIconStyle = computed(() => checkIcon());
const onClick = () => {
  modelValue.value = !modelValue.value;
};
</script>