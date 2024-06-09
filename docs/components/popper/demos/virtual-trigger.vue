<template>
  <popper virtual-trigger :trigger-ref="virtual" placement="top">
    <popper-content v-if=visible>
      <div class="p-4 rounded-md bg-default">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </div>
    </popper-content>
  </popper>
  <m-button @click="visible = !visible">
    Show
  </m-button>
</template>

<script lang="ts" setup>
import { Button as MButton, Popper, PopperContent, VirtualTrigger } from '@miraiui-org/vue-components';
import { onMounted, onUnmounted, ref } from 'vue';
const visible = ref(false);
const pos = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
});
const virtual = ref<VirtualTrigger>({
  getBoundingClientRect() {
    return pos.value;
  }
});
const mousemoveHandler = (e) => {
  pos.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  });
};
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler);
});
</script>