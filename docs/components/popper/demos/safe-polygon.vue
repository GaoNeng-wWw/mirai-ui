<template>
  <div class="w-full h-full">
    <label for="polygon">
      偏移量
    </label>
    <input type="range" min="0" max="100" v-model="offset" />
    <popper :offset="offsetNumber" safe-polygon :trigger="'hover'" :placement="position" safe-polygon-debug safe-polygon-class="bg-red-500">
      <template #reference>
        <m-button>
          点击我
        </m-button>
      </template>
      <template #floating>
        <div class="p-4 rounded-md bg-default max-w-60 break-words">
          {{ message }}
        </div>
      </template>
    </popper>
  </div>
</template>

<script setup lang="ts">
import {Button as MButton, Popper, PopperPlacement} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const offset = ref(24)
const offsetNumber = computed(() => Number(offset.value));
const position = ref<PopperPlacement>('bottom')
const message = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aut dicta expedita unde? Ex, facilis? Aut velit ullam temporibus omnis? Temporibus culpa dicta odio eligendi doloremque voluptas nobis esse laborum.');
setTimeout(() => {
  message.value = message.value.repeat(2)
}, 5000);
</script>