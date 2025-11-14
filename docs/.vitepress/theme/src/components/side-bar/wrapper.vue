<script lang="ts" setup>
import { DefaultTheme, useData } from 'vitepress';
import SidebarItem from './item.vue';
import { isActive } from '../../composables/is-active';
import { computed } from 'vue';

const {
  title,
  children = [],
} = defineProps<{
  title?: string;
  children?: DefaultTheme.SidebarItem[];
}>();

const { page } = useData();

const currentPath = computed(() => page.value.relativePath);

</script>

<template>
  <div>
    <p class="text-DEFAULT-700 font-bold text-base">
      {{ title }}
    </p>
    <div class="px-4">
      <sidebar-item
        v-for="child, idx in children"
        :key="idx"
        :title="child.text"
        :link="child.link"
        :active="isActive(currentPath, child.link, false)"
      />
    </div>
  </div>
</template>
