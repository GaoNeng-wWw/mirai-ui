<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Search" label-position="top-inside" size="md" freeze-label-position>
      <template #prefix>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mb-0.5 flex-shrink-0 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </template>
    </m-input>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const data = ref('');
</script>