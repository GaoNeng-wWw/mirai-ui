<template>
  <div class="flex gap-2">
    <popper trigger="hover" :offset="2">
      <template #reference>
        <m-button>
          鼠标移入触发
        </m-button>
      </template>
      <template #floating>
        <div class="p-4 rounded-md bg-default max-w-60 break-words">
          移出时自动隐藏
        </div>
      </template>
    </popper>
    <popper trigger="focus">
      <template #reference>
        <m-button>
          聚焦触发
        </m-button>
      </template>
      <template #floating>
        <div class="p-4 rounded-md bg-default max-w-60 break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aut dicta expedita unde? Ex, facilis? Aut velit ullam temporibus omnis? Temporibus culpa dicta odio eligendi doloremque voluptas nobis esse laborum.
        </div>
      </template>
    </popper>
    <popper trigger="contextmenu" @before-open="({e}) => e.preventDefault()">
      <template #reference>
        <m-button>
          右键触发
        </m-button>
      </template>
      <template #floating>
        <div class="p-4 rounded-md bg-default max-w-60 break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aut dicta expedita unde? Ex, facilis? Aut velit ullam temporibus omnis? Temporibus culpa dicta odio eligendi doloremque voluptas nobis esse laborum.
        </div>
      </template>
    </popper>
  </div>
</template>

<script setup lang="ts">
import {Button as MButton, Popper} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const show = ref(false);
</script>