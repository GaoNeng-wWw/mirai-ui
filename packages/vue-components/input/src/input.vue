<template>
  <div :class="baseStyle" :data-focus="focus || modelValue.length > 0" @click="focusInput" :data-invalid="prop.error">
    <label @click="focusInput" v-if="shouldShowOutSideLabel" :class="outsideLabelStyle" :for="ariaId">
      {{ prop.label }}
    </label>
    <div :class="innerWrapperStyle">
      <label @click="focusInput" v-if="shouldShowInnerLabel" :class="innerLabelStyle" :for="ariaId">
        {{ prop.label }}
      </label>
      <div :class="mainComponentStyle">
        <input ref="inputEl" :id="ariaId" :class="inputStyle" type="text" v-model="modelValue" @focus="onFocus" @blur="onBlur">
      </div>
      <div :class="descriptionWrapperStyle" v-if="prop.labelPosition !== 'top-inside'">
        <span>Description</span>
      </div>
    </div>
    <div :class="descriptionWrapperStyle" v-if="prop.labelPosition === 'top-inside'">
      <span>Description</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { inputProp } from './input.props';
import { base, descriptionWrapper, innerLabel, innerWrapper, input, mainComponentWrapper, outsideLabel } from '@miraiui-org/theme';

const COMPONENT_NAME='MInput';
defineOptions({
  name: COMPONENT_NAME
});
const [modelValue] = defineModel<string>({ required: true });
const prop = defineProps(inputProp);
const focus = ref(false);
const inputEl = ref<HTMLInputElement | null>(null);
const baseStyle = computed(() => base(prop));
const outsideLabelStyle = computed(() => outsideLabel(prop));
const descriptionWrapperStyle = computed(() => descriptionWrapper());
const innerWrapperStyle = computed(() => innerWrapper(prop));
const innerLabelStyle = computed(() => innerLabel(prop));
const inputStyle = computed(() => input(prop));
const mainComponentStyle = computed(() => mainComponentWrapper(prop));
const shouldShowOutSideLabel = computed(() => prop.label && prop.labelPosition.includes('outside'));
const shouldShowInnerLabel = computed(() => prop.label && !prop.labelPosition.includes('outside'));
const ariaId = computed(() => prop.id ?? `aria-${new Date().getTime()}`);
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