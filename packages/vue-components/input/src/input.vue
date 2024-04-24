<template>
  <div>
    <div :class="inputWrapperClass" :data-focus="focus || modelValue.length > 0" @click="focusInput">
      <label role="label" :class="labelClass" id="test" v-if="prop.label.length">{{ prop.label }}</label>
      <div :class="mainWrapperStyle">
        <div :class="inputInnerWrapperStyle">
          <div class="grow shrink-0">
            <slot name="prefix"/>
          </div>
          <input :aria-label="label" v-model="modelValue" id="test" :class="inputStyle" @focus="onFocus" @blur="onBlur" ref="inputEl" :placeholder="prop.placeholder" />
          <div class="grow shrink-0">
            <slot name="suffix" /> 
          </div>
        </div>
        <div v-if="prop.error && prop.labelPosition === 'left'">
          <span class="text-danger text-sm">{{ prop.errorMessage }}</span>
        </div>
      </div>
    </div>
    <div v-if="prop.error && prop.labelPosition !== 'left'">
      <span class="text-danger text-sm">{{ prop.errorMessage }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { inputProp } from './input.props';
import { inputWrapper, labelStyle, inputInnerWrapper, input, mainWrapper } from '@miraiui-org/theme';

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
const mainWrapperStyle = computed(() => mainWrapper(prop));
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