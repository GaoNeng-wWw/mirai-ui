<template>
  <div>
    <div class="space-x-2">
      <m-button type="default" @click="onClick">输出当前时间</m-button>
      <m-button type="danger" @dblclick="()=>messages=[]">双击清除日志</m-button>
    </div>
    <div class="max-h-32 overflow-auto bg-default p-4 space-y-2 my-4 rounded-md">
      <p v-for="msg in messages" class="m-0">
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const messages = ref<number[]>([]);
const onClick = () => {
  messages.value.push(new Date().getTime())
}
</script>