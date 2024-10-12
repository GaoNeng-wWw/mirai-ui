<template>
  <div class="grid grid-rows-2 gap-y-4">
    <checkbox :disabled="disabled" v-model="selectAll" label="Select All" :indeterminate="indeterminate" @click="onClickSelectAll" />
    <div class="flex flex-wrap gap-2">
      <checkbox :disabled="disabled" v-model="checks.cola" label="Cola" />
      <checkbox :disabled="disabled" v-model="checks.coffee" label="Coffee" />
      <checkbox :disabled="disabled" v-model="checks.tea" label="Tea" />
    </div>
  </div>
  <div>
    <p>select-all: {{ selectAll }}</p>
    <p>Cola: {{ checks.cola }}</p>
    <p>Coffee: {{ checks.coffee }}</p>
    <p>Tea: {{ checks.tea }}</p>
  </div>
</template>

<script lang="ts" setup>
import { Checkbox } from '@miraiui-org/vue-components';
import { computed, reactive, ref, watch } from 'vue';
const checks = reactive({
  cola: false,
  coffee: false,
  tea: false
});
const disabled = ref(false);
const indeterminate = computed(() => {
  const values = Object.values(checks);
  // 如果全选或者全都不选则不显示
  if (values.every(v => !v) || values.every(v => v)) {
    return false;
  }
  console.log(Object.values(checks).some(v => !v));
  return Object.values(checks).some(v => !v);
});
const selectAll = ref(Object.values(checks).every(v => v));
watch(checks, () => {
  selectAll.value = Object.values(checks).every(v => v);
});
const onClickSelectAll = () => {
  checks.cola = selectAll.value;
  checks.coffee = selectAll.value;
  checks.tea = selectAll.value;
};
</script>