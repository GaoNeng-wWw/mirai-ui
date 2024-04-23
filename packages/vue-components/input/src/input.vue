<template>
  <div>
    <div :class="inputWrapperClass" :data-focus="focus || modelValue.length > 0" @click="focusInput">
      <label role="label" :class="labelClass" id="test" v-if="prop.label.length">{{ prop.label }}</label>
      <div :class="inputInnerWrapperStyle">
        <slot name="prefix"/>
        <input :aria-label="label" v-model="modelValue" id="test" :class="inputStyle" @focus="onFocus" @blur="onBlur" ref="inputEl" />
        <slot name="suffix"/> 
      </div>
    </div>
    <span v-if="prop.error" class="text-danger text-sm">{{ prop.errorMessage }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { inputProp } from './input.props';
import { inputWrapper, labelStyle, inputInnerWrapper, input } from '@miraiui-org/theme';

const COMPONENT_NAME='MInput';
defineOptions({
  name: COMPONENT_NAME
});
const [modelValue] = defineModel<string>({ required: true });
const prop = defineProps(inputProp);
const inputWrapperClass = computed(() => inputWrapper(prop));
const labelClass = computed(() => labelStyle(prop));
const inputInnerWrapperStyle = computed(() => inputInnerWrapper(prop));
const inputStyle = computed(() => input(prop));
const focus = ref(false);
const inputEl = ref<HTMLInputElement | null>(null);
const onFocus = () => {
  focus.value = true;
};
const onBlur = () => {
  focus.value = false;
};
const focusInput = () => {
  if(!inputEl.value) {
    return;
  }
  inputEl.value.focus();
};
</script>