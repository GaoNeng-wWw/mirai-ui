<template>
  <transition-slide-fade>
    <div class="w-32 h-32 rounded-md bg-default" v-if="visible"></div>
  </transition-slide-fade>
  <m-button @click="visible = !visible" class="mt-4">
    切换
  </m-button>
</template>

<script lang="ts" setup>
import { TransitionSlideFade, Button as MButton } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
</script>