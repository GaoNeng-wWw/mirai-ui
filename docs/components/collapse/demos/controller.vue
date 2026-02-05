<script lang="ts" setup>
import { MButton, MCollapse, MCollapseItem, MCollapseHeader, MCollapseContent } from '@miraiui-org/vue-core';
import { ref } from 'vue';

const active = ref<string[]>([]);
const disabled = ref<string[]>([]);
</script>

<template>
  <div class="w-full h-full">
    <m-button @click="active.includes('a') ? active = active.filter((item) => item !== 'a') : active.push('a')">
      {{ active.includes('a') ? '收起' : '展开' }} 第一项
    </m-button>
    <m-button @click="disabled.includes('a') ? disabled = disabled.filter((item) => item !== 'a') : disabled.push('a')">
      {{ disabled.includes('a') ? '解禁' : '禁用' }} 第一项
    </m-button>
    <m-collapse v-model="active" :disabled="disabled">
      <m-collapse-item id="a">
        <m-collapse-header>
          Item - 1
        </m-collapse-header>
        <m-collapse-content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, quia. Qui ex unde incidunt quisquam ab distinctio, expedita ipsam perferendis mollitia repudiandae sunt, dicta reprehenderit accusantium ad a corporis iure.
        </m-collapse-content>
      </m-collapse-item>
      <m-collapse-item id="b">
        <m-collapse-header>
          Item - 2
        </m-collapse-header>
        <m-collapse-content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, quia. Qui ex unde incidunt quisquam ab distinctio, expedita ipsam perferendis mollitia repudiandae sunt, dicta reprehenderit accusantium ad a corporis iure.
        </m-collapse-content>
      </m-collapse-item>
    </m-collapse>
  </div>
</template>
