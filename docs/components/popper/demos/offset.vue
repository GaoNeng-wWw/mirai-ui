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
