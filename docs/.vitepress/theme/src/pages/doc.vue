<script lang="ts" setup>
import { Content } from 'vitepress';
import SideBar from '../components/side-bar/index.vue';
</script>

<template>
  <div class="w-full min-h-dvh flex gap-10">
    <div
      class="w-40 h-dvh shrink-0 grow-0 p-4 border-r border-r-DEFAULT sticky top-0"
    >
      <side-bar />
    </div>
    <div class="grow min-w-0 pr-8 lg:pr-0 prose max-w-full dark:prose-invert py-4 prose-p:font-display prose-heading:font-display">
      <content />
    </div>
    <div class="w-20 shrink-0 h-20 hidden lg:block" />
  </div>
</template>
