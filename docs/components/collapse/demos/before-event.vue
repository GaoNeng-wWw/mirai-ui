<template>
  <collapse v-model="actived" @before-open="beforeOpen" @before-close="beforeClose">
    <collapse-item title="Header-1" key="item-1">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
    <collapse-item title="prevent-open" key="prevent-open">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
    <collapse-item title="prevent-close" key="prevent-close">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
  </collapse>
</template>

<script lang="ts" setup>
import { Collapse, CollapseItem } from '@miraiui-org/vue-components';
import { ref } from 'vue';
const actived = ref(['item-1']);
const beforeOpen = (key: string, f: () => void) => {
  if (key === 'prevent-open') {
    return;
  }
  f();
};
const beforeClose = (key: string, f: () => void) => {
  if (key === 'prevent-close') {
    return;
  }
  f();
};
</script>