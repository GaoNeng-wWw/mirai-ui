<template>
  <div class="w-full h-full flex items-center justify-center relative">
    <div
      class="px-2 py-1 h-32 w-32 rounded-md bg-default-200 flex items-center justify-center"
      @contextmenu.prevent="onContextMenu"
    >
      <span>右键弹出菜单</span>
    </div>
    <Popper virtual-trigger :trigger-ref="virtual as any">
      <transition-fade>
        <popper-content v-if="visible">
          <div class="p-2 rounded bg-default-100" @click="visible = false">
            <div class="p-2 rounded-md cursor-pointer hover:bg-default-200">item-1</div>
            <div class="p-2 rounded-md cursor-pointer hover:bg-default-200">item-2</div>
            <div class="p-2 rounded-md cursor-pointer hover:bg-default-200">item-3</div>
            <div class="p-2 rounded-md cursor-pointer hover:bg-default-200">item-4</div>
          </div>
        </popper-content>
      </transition-fade>
  </Popper>
  </div>
</template>

<script setup lang="ts">
import {Popper, PopperContent, TransitionFade} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const visible = ref(false);
const pos = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})
const virtual = ref({
  getBoundingClientRect(){
    return pos.value
  }
})
const onContextMenu = (e: MouseEvent) => {
  pos.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  })
  visible.value = !visible.value;
}
document.addEventListener('scroll', ()=>{
  visible.value = false;
})
</script>