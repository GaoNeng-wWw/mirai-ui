<template>
  <div>
    <m-button :radius="size">
      {{ size }}
    </m-button>
    <div>
      <label for="radius-size-none">
        <input type="radio" v-model="size" value="none" name="radius-size" id="radius-size-none">
        None
      </label>
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
      <label for="radius-size-full">
        <input type="radio" v-model="size" value="full" name="radius-size" id="radius-size-full">
        Full
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton, ButtonRadius} from '@miraiui-org/vue-components';
import { ref } from 'vue';

const size = ref<ButtonRadius>('md')
</script>
