<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input-2" label="Email" :label-position="position" placeholder="Please input your email here" error />
    <div class="flex flex-col">
      <label v-for="colorId of positionId" :for="`${colorId}-2`" >
        <input type="radio" v-model="position" :id="`${colorId}-2`" :value="colorId" />
        {{ colorId }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput, InputLabelPosition} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const data = ref('');
const position = ref<InputLabelPosition>('top-motion');
const positionId = ref(['top-motion','top', 'left'])
</script>