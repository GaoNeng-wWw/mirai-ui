<template>
  <div class="space-y-2">
    <m-input v-model="data" id="ama-input" label="Ask" description="Ask me anything" :colors="color"/>
    <m-input v-model="data" id="ama-input" label="Ask" description="Ask me anything" :colors="color" variant="border"/>
    <div class="flex flex-col">
      <label v-for="colorId of colors" :for="`ama-${colorId}`" >
        <input type="radio" v-model="color" :id="`ama-${colorId}`" :value="colorId" />
        {{ colorId }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput, InputColors} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const data = ref('');
const color = ref<InputColors>('default');
const colors = ref(['default', 'primary', 'warning', 'danger', 'success'])
</script>