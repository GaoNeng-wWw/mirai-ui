<template>
  <popper :show="show">
    <template #reference>
      <m-button @click="show = !show">
        Trigger
      </m-button>
    </template>
    <template #floating>
      <div class="p-4 rounded-md bg-default max-w-60 break-words">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aut dicta expedita unde? Ex, facilis? Aut velit ullam temporibus omnis? Temporibus culpa dicta odio eligendi doloremque voluptas nobis esse laborum.
      </div>
    </template>
  </popper>
</template>

<script setup lang="ts">
import {Button as MButton, Popper} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const show = ref(false);
</script>