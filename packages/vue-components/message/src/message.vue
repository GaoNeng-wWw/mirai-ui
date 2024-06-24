<template>
  <transition-fade appear @before-leave="props.onClose" @after-leave="props.onDestory">
    <div v-if="visible" :class="styles" ref="msg" :style="externalStyle">
      <slot>
        <p>{{content}}</p>
      </slot>
      <icon-close viewBox="0 0 24 24" :class="closeIconStyle" @click="close" />
    </div>
  </transition-fade>
</template>
<script setup lang="ts">
import { TransitionFade } from '@miraiui-org/vue-transition-fade';
import { message, closeIcon } from '@miraiui-org/theme';
import { messageProps } from './message.prop';
import { computed, onUnmounted, ref, toRefs } from 'vue';
import { getOffset } from './instance';
import { useTimeoutFn } from '@vueuse/core';
import IconClose from './close.vue';
const COMPONENT_NAME='MMessage';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(messageProps);
const styles = message(props);
const closeIconStyle = closeIcon();
const { content, gap, id } = toRefs(props);
const msg = ref<HTMLDivElement | null>(null);
const visible = ref(true);
const h = computed(() => msg.value?.getBoundingClientRect().height ?? 0);
const close = () => {
  visible.value = false;
  props.onClose?.();
};
const top = computed(() => getOffset(id.value, h.value, gap.value));
const bottom = computed(() => h.value + top.value);
const externalStyle = computed(() => ({
  top: `${top.value}px`
}));
const stop = useTimeoutFn(() => {
  close();
}, 3000);


onUnmounted(() => {
  stop.stop();
});

defineExpose({
  close,
  bottom,
  visible
});
</script>