<template>
  <div class="h-48 overflow-auto">
    <div class="h-96 w-full flex items-center justify-center">
      <popper v-model="show">
        <popper-trigger @click="()=>console.log('hello-world')">
          <button ref="btn">Show</button>
        </popper-trigger>
        <popper-content>
          <div class="w-max h-fit p-4 rounded-md bg-default">
            hello-world
          </div>
        </popper-content>
      </popper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Popper,PopperTrigger,PopperContent} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const btn = ref();
const show = ref(false);
</script>