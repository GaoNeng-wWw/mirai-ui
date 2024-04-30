<template>
  <popper trigger="click" auto-placement>
    <template #reference>
      <m-button>
        点击我
      </m-button>
    </template>
    <template #floating>
      <div class="p-4 rounded-md bg-default max-w-60 break-words z-10">
        尝试着滚动一下页面
      </div>
    </template>
  </popper>
</template>

<script setup lang="ts">
import {Button as MButton, Popper, PopperPlacement} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const show = ref(false);
const p = ref<PopperPlacement>('top-start')
const positions = ref<PopperPlacement[]>(
  [
    'top-start', 'top', 'top-end',
    'left-start', 'left', 'left-end',
    'right-start', 'right', 'right-end',
    'bottom-start', 'bottom', 'bottom-end'
  ]
);
</script>