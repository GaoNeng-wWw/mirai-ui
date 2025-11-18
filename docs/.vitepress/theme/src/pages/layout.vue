<script lang="ts" setup>
import { useData } from 'vitepress';
import Doc from './doc.vue';
const { page, frontmatter } = useData();
</script>

<template>
  <div class="w-full h-dvh dark bg-DEFAULT-50 overflow-auto">
    <!--  -->
    <div v-if="frontmatter.layout === 'Home'" />
    <doc v-else />
  </div>
</template>
