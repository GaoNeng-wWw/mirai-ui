<template>
  <div v-if="visible" :class="styles" ref="msg" :style="externalStyle">
    <slot>
      <p>{{content}}</p>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { message } from '@miraiui-org/theme';
import { messageProps } from './message.prop';
import { computed, ref, toRefs } from 'vue';
import { getOffset } from './instance';
const COMPONENT_NAME='MMessage';
defineOptions({
  name: COMPONENT_NAME
});
const props = defineProps(messageProps);
const styles = message(props);
const { content, gap, id } = toRefs(props);
const msg = ref<HTMLDivElement | null>(null);
const visible = ref(true);
const h = computed(() => msg.value?.getBoundingClientRect().height ?? 0);
const close = () => visible.value = false;
const top = computed(() => getOffset(id.value, h.value, gap.value));
const bottom = computed(() => h.value + top.value);
const externalStyle = computed(() => ({
  top: `${top.value}px`
}));
defineExpose({
  close,
  bottom,
  visible
});
</script>