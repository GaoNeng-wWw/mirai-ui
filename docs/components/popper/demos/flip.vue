<template>
  <popper trigger="click" flip>
    <template #reference>
      <m-button>
        点击我
      </m-button>
    </template>
    <template #floating>
      <div class="p-4 rounded-md bg-default max-w-60 break-words">
        <p class="text-2xl !mb-1 !mt-0 py-0 text-default-foreground">
          标题
        </p>
        <span class="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum magni ad similique sit corporis beatae ducimus dolores dolorem esse, quia veritatis ratione, amet architecto autem quas voluptatem unde praesentium veniam?
        </span>
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