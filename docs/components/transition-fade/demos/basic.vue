<template>
  <transition-fade>
    <div v-if="visible" class="w-32 h-32 bg-primary text-primary-foreground">
      hello-world
    </div>
  </transition-fade>
  <m-button @click="visible = !visible">
    切换
  </m-button>
</template>

<script lang="ts" setup>
import {TransitionFade, Button as MButton} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
</script>