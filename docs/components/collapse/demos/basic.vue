<template>
  <collapse v-model="actived">
    <collapse-item title="Header-1" key="item-1">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
    <collapse-item title="Header-2" key="item-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
    <collapse-item title="Header-3" key="item-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum incidunt dicta voluptas praesentium sapiente tempora numquam quidem, possimus autem quisquam tenetur voluptatibus, similique saepe officia amet velit ratione! Explicabo, voluptatum?
    </collapse-item>
  </collapse>
</template>

<script lang="ts" setup>
import {Collapse, CollapseItem} from '@miraiui-org/vue-components';
import { ref } from 'vue';
const actived = ref(['item-1']);
// const disabledKeys = ref(["item-1"]);
</script>
