<template>
  <div class="space-y-2">
    <m-input v-model="data" id="input" label="Email" :error="error" error-message="输入的信息不是合法的邮箱"/>
  </div>
</template>

<script lang="ts" setup>
import {Input as MInput} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const data = ref('');
const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const isEmail = () => pattern.test(data.value);
const error = computed(()=>data.value.length === 0 ? false : !isEmail());
</script>