<template>
  <div class="grid grid-cols-3 gap-3 items-center justify-center">
    <template v-for="position of positions">
      <popper :placement="position" trigger="click">
        <template #reference>
          <m-button>
            {{ position }}
          </m-button>
        </template>
        <template #floating>
          <div class="p-4 rounded-md bg-default max-w-60 break-words">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aut dicta expedita unde? Ex, facilis? Aut velit ullam temporibus omnis? Temporibus culpa dicta odio eligendi doloremque voluptas nobis esse laborum.
          </div>
        </template>
      </popper>
    </template>
  </div>
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