<template>
  <div class="flex flex-wrap items-center gap-3">
    <m-button type="default" :shape="shape">Default</m-button>
    <m-button type="primary" :shape="shape">Primary</m-button>
    <m-button type="warning" :shape="shape">Warning</m-button>
    <m-button type="danger"  :shape="shape">Danger</m-button>
    <m-button type="success" :shape="shape">Success</m-button>
    
    <div>
      <label>
        solid
        <input type="radio" id="shape" v-model="shape" value="solid" />
      </label>
      <label>
        outline
        <input type="radio" id="shape" v-model="shape" value="outline" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ButtonShape, Button as MButton} from '@mirai-ui/vue-components';
import { ref } from 'vue';
const shape = ref<ButtonShape>('solid');
</script>