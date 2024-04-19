<template>
  <div>
    <collapse v-model="actived" @open="onOpen" @close="onClose" allow-init-open-event accordion>
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
    <div class="w-full p-4 rounded-md border max-h-32 mt-4 overflow-auto">
      <p v-for="log of logs">
        {{ log }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Collapse, CollapseItem} from '@miraiui-org/vue-components';
import { computed, ref } from 'vue';
const actived = ref(['item-1']);
const logs = ref([]);
const onOpen = (key) => {
  logs.value.push(`${key} open!`)
}
const onClose = (key) => {
  logs.value.push(`${key} close!`)
}
</script>
