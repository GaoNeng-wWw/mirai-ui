<script lang="ts" setup>
import { ButtonSized, MButton } from '@miraiui-org/vue-button';
import { ref } from 'vue';

const loading = ref(false);
const toggleLoading = (ev) => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 5000);
};
</script>

<template>
  <div class="w-full h-fit">
    <m-button :loading="loading" @click="toggleLoading">
      Button
    </m-button>
  </div>
</template>
