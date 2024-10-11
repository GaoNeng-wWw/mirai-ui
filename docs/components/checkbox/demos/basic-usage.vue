<template>
  <checkbox v-model="checked" />
</template>

<script lang="ts" setup>
import { Checkbox } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const checked = ref(false);
</script>