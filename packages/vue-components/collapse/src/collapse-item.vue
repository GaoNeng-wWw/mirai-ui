<template>
  <div>
    <div :class="headerClass" @click.prevent.stop="()=>collapsed.onItemClick(key)">
      <slot name="prefix">
        <div class="shrink-0 basis-auto">
          <arrow-down :class="`${open ? 'rotate-0' : '-rotate-90'} transition-all`" />
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
      <div v-if="open" class="">
        <slot />
      </div>
    </transition-collapse>
  </div>
</template>

<script lang="ts" setup>
import type { CollapseProvide } from './collapse.type';
import { TransitionCollapse } from '@mirai-ui/vue-transition-collapse';
import { collapseHeader } from '@mirai-ui/theme';
import ArrowDown from './icons/arrow-down.vue';
import { computed, getCurrentInstance, inject, toRefs, useSlots } from 'vue';
import { collapseItemProps, CONSTANT } from './collapse.props';
const headerClass = collapseHeader();
const slots = useSlots();
defineOptions({
  name: 'MCollapseItem'
});
const { key } = getCurrentInstance().vnode;
if (key === undefined) {
  console.log('[Collapse-Item]: You haven\'t set the key, so you may not be able to fold it');
}
const props = defineProps(collapseItemProps);
const { title } = toRefs(props);
const collapsed = inject<CollapseProvide>(CONSTANT, null);
const disabled = computed(() => collapsed.disabledKeys.includes(key));
const open = computed(() => collapsed.modelValue.includes(key) && !disabled.value);
</script>