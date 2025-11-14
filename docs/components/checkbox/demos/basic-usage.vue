<template>
  <div class="grid grid-cols-4">
    <checkbox v-model="checked" label="Label" />
    <checkbox v-model="checked" label="Label" variant="primary"/>
    <checkbox v-model="checked" label="Label" variant="danger" />
    <checkbox v-model="checked" label="Label" variant="warning" />
  </div>
</template>

<script lang="ts" setup>
import { Checkbox } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const checked = ref(false);
</script>