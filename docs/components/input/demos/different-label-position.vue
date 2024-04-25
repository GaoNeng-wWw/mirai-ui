<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Email" :label-position="position" />
    <div class="flex flex-col">
      <label v-for="colorId of positionId" :for="colorId" >
        <input type="radio" v-model="position" :id="`${colorId}`" :value="colorId" />
        {{ colorId }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput, InputLabelPosition} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const data = ref('');
const position = ref<InputLabelPosition>('top-inside');
const positionId = ref(['top-outside','top-inside', 'left-outside'])
</script>