<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Email" :size="size"/>
    <div class="flex flex-col">
      <label v-for="colorId of sizes" :for="colorId" >
        <input type="radio" v-model="size" :id="`${colorId}`" :value="colorId" />
        {{ colorId }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput, InputSize} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const data = ref('');
const size = ref<InputSize>('md');
const sizes = ref(['sm','md','lg'])
</script>