<template>
  <div>
    <collapse v-model="actived" :color="color">
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
    <div class="mt-2 flex flex-col gap-2">
      <template v-for="c of colors" :key="c">
        <div class=" space-x-2">
          <input type="radio" v-model="color" :value="c" :id="c" />
          <label :for="c">
            {{ c }}
          </label>
        </div>
      </template>
      {{ color }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Collapse, CollapseItem, CollapseColor } from '@miraiui-org/vue-components';
import { Ref, ref } from 'vue';
const actived = ref(['item-1']);
const colors: Ref<CollapseColor[]> = ref(
  [
    'default',
    'primary',
    'success',
    'danger',
    'warning'
  ]
);
const color = ref(colors.value[0]);
</script>
