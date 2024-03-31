<template>
  <button @click="()=>{show = !show}">click</button>
  <transitionCollapse>
    <div class="px-4" v-show="show">hello-world</div>
  </transitionCollapse>
</template>

<script lang="ts" setup>
import transitionCollapse from '../src/transitionCollapse.vue';
import { ref } from 'vue';

const show = ref(false);
</script>