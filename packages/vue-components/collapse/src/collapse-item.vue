<template>
  <div>
    <div :class="headerClass">
      <slot name="prefix">
        <div class="shrink-0 basis-auto">
          <arrow-down :class="open ? 'rotate-0' : '-rotate-90'" />
        </div>
      </slot>
      <span>
        {{ title }}
      </span>
      <div class="shrink-0 basis-auto" v-if="slots.suffix">
        <slot name="suffix" />
      </div>
    </div>
    <transition-collapse>
      <div v-if="open">
        <slot />
      </div>
    </transition-collapse>
  </div>
</template>

<script lang="ts" setup>
import { TransitionCollapse } from '@mirai-ui/vue-transition-collapse';
import { collapseHeader } from '@mirai-ui/theme';
import ArrowDown from './icons/arrow-down.vue';
import { ref, toRefs, useSlots } from 'vue';
import { collapseItemProps } from './collapse.props';
const headerClass = collapseHeader();
const slots = useSlots();
defineOptions({
  name: 'MCollapseItem'
});
const props = defineProps(collapseItemProps);
const open = ref(false);
const { title } = toRefs(props);
</script>