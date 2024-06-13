<template>
  <m-mask v-if="show" lock-scroll>
    <div class="p-4 rounded-md bg-default-200 w-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <m-button @click="show=false">
        关闭遮罩
      </m-button>
    </div>
  </m-mask>
  <m-button @click="show = true">
    显示遮罩
  </m-button>
</template>

<script setup lang="ts">
import { Button as MButton, Mask as MMask } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const show = ref(false);
</script>