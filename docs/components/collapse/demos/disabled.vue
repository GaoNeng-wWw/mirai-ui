<script lang="ts" setup>
import { MCollapse, MCollapseItem, MCollapseHeader, MCollapseContent } from '@miraiui-org/vue-core';
import { ref } from 'vue';

const active = ref<string[]>([]);
</script>

<template>
  <m-collapse v-model="active" accordion :disabled="['a']">
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
</template>
