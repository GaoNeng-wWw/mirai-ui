<template>
  <m-mask v-if="show" :type="type">
    <div class="p-4 rounded-md bg-default-200 w-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <m-button @click="show=false">
        关闭遮罩
      </m-button>
    </div>
  </m-mask>
  <div class="space-x-2">
    <m-button @click="()=>{show = true;type='fill'}">
      颜色
    </m-button>
    <m-button @click="()=>{show = true;type = 'blur'}">
      模糊
    </m-button>
    <m-button @click="()=>{show = true;type = ['blur', 'fill']}">
      模糊 + 颜色
    </m-button>
  </div>
</template>

<script setup lang="ts">
import { Button as MButton, Mask as MMask, MaskType } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const show = ref(false);
const type = ref<MaskType>('fill');
</script>