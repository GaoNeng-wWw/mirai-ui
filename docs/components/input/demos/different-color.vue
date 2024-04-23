<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Email" :colors="color"/>
    <div class="flex flex-col">
      <label v-for="colorId of colors" :for="colorId" >
        <input type="radio" v-model="color" :id="`${colorId}`" :value="colorId" />
        {{ colorId }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput, InputColors} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const data = ref('');
const color = ref<InputColors>('default');
const colors = ref(['default', 'primary', 'warning', 'danger', 'success'])
</script>