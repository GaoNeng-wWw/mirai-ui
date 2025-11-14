<template>
  <div class="grid grid-cols-4 gap-y-2">
    <checkbox :disabled="disabled" v-model="checked" label="Disabled" />
    <checkbox :disabled="disabled" v-model="checked" label="Disabled" variant="primary"/>
    <checkbox :disabled="disabled" v-model="checked" label="Disabled" variant="danger" />
    <checkbox :disabled="disabled" v-model="checked" label="Disabled" variant="warning" />
    <m-button @click="()=>disabled = !disabled">
      禁用
    </m-button>
  </div>
</template>

<script lang="ts" setup>
import { Checkbox, Button as MButton } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const checked = ref(false);
const disabled = ref(false);
</script>