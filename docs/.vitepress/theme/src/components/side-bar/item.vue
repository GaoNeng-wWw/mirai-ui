<script lang="ts" setup>
import SideBarWrapper from './wrapper.vue';
import { DefaultTheme } from 'vitepress';

const {
  title,
  link,
  children = [],
  active = false,
} = defineProps<{
  title?: string;
  link?: string;
  children?: DefaultTheme.SidebarItem[];
  active?: boolean;
}>();
</script>

<template>
  <div :data-active="active" class="group">
    <side-bar-wrapper v-if="children.length" :title="title" :children="children" />
    <a
      :href="link"
      class="
        text-DEFAULT-700 hover:text-DEFAULT-foreground transition duration-300
        group-data-[active=true]:text-DEFAULT-foreground
        "
    >
      {{ title }}
    </a>
  </div>
</template>
