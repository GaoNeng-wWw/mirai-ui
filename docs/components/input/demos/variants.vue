<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Email"/>
    <m-input v-model="data" id="input" label="Email" variant="border" />
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const data = ref('');
</script>