<template>
  <div class="h-48 overflow-auto">
    <div class="h-96 w-full flex items-center justify-center">
      <popper>
        <popper-trigger @click="show = !show">
          <m-button ref="btn">Show</m-button>
        </popper-trigger>
        <popper-content v-if="show">
          <div class="w-max h-fit p-4 rounded-md bg-default">
            hello-world
          </div>
        </popper-content>
      </popper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Popper,PopperTrigger,PopperContent, Button as MButton} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const btn = ref();
const show = ref(false);
</script>