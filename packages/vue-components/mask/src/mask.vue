<template>
  <div 
    class="w-full h-full top-0 left-0 bg-black/30 z-50 mask"
    :class="{
      'fixed': fullScreen,
      'absolute': !fullScreen
    }"
    @click="(e)=>emits('click',e)"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { maskProps } from './mask.props';
const COMPONENT_NAME='MMask';
defineOptions({
  name: COMPONENT_NAME
});
const { fullScreen, lockScroll } = defineProps(maskProps);
const emits = defineEmits<{
  click: [e: MouseEvent]
}>();
const f = (e:Event) => {
  e.preventDefault();
};
onMounted(() => {
  if (lockScroll) {
    window.addEventListener('wheel', f, { passive: false });
  }
});
onUnmounted(() => {
  window.removeEventListener('wheel', f);
});
</script>