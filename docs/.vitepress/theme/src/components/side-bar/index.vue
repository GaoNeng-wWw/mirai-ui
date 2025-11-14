<script lang="ts" setup>
import { useSideBar } from '../../composables/';
import SidebarWrapper from './wrapper.vue';
import SidebarItem from './item.vue';

const { sidebar } = useSideBar();
</script>

<template>
  <div class="w-full">
    <div
      v-for="item, idx of sidebar"
      :key="idx"
    >
      <sidebar-wrapper
        v-if="item.items?.length"
        :title="item.text"
        :children="item.items"
      />
      <sidebar-item v-else :title="item.text" :link="item.link" :children="item.items" />
    </div>
  </div>
</template>
