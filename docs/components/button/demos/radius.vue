<template>
  <div>
    <m-button :radius="size">
      {{ size }}
    </m-button>
    <div>
      <label for="radius-size-sm">
        <input type="radio" v-model="size" value="sm" name="radius-size" id="radius-size-sm">
        Small
      </label>
      <label for="radius-size-md">
        <input type="radio" v-model="size" value="md" name="radius-size" id="radius-size-md">
        Medium
      </label>
      <label for="radius-size-lg">
        <input type="radio" v-model="size" value="lg" name="radius-size" id="radius-size-lg">
        Large
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton, ButtonRadius} from '@mirai-ui/vue-components';
import { ref } from 'vue';

const size = ref<ButtonRadius>('md')
</script>
