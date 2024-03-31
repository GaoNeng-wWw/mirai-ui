<template>
  <div class="space-y-4">
    <Button @click="()=>show=!show">
      {{ show ? '折叠' : '展开' }}
    </Button>
    <transition-collapse>
      <div v-if="show" class="w-60 bg-primary-500 p-2 rounded-md">
        transition-collapse
      </div>
    </transition-collapse>
  </div>
</template>

<script lang="ts" setup>
import {TransitionCollapse, Button} from '@mirai-ui/vue-components';
import { ref } from 'vue';
const show = ref(true);
</script>