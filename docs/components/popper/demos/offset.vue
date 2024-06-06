<template>
  <div class="flex gap-4 p-4">
    <popper :offset="offsetNumber" :placement="'right'">
      <popper-trigger>
        <m-button @click="show=!show">
          Show
        </m-button>
      </popper-trigger>
      <popper-content v-if="show">
        <div class="bg-default p-2 rounded-md">
          {{ offset }}px
        </div>
      </popper-content>
    </popper>
  </div>
  <div>
    <label for="offset">
      偏移量
    </label>
    <input id="offset" type="range" min="0" v-model="offset" />
    <span>{{ offset }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  Button as MButton,
  Popper,
  PopperTrigger,
  PopperContent
} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const show = ref(false);
const offset = ref(8);
const offsetNumber = computed(() => Number(offset.value));
</script>

<!-- <template>
  <div class="flex gap-4">
    <popper :show="show" :offset="offsetNumber">
      <template #reference>
        <m-button @click="()=>show=!show">
          点击我
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

 -->