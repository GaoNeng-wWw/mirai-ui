<template>
  <div class="flex flex-wrap items-center gap-3">
    <m-button type="default" :disabled="isDisabled" :loading="isLoading" :shape="shape">Default</m-button>
    <m-button type="primary" :disabled="isDisabled" :loading="isLoading" :shape="shape">Primary</m-button>
    <m-button type="warning" :disabled="isDisabled" :loading="isLoading" :shape="shape">Warning</m-button>
    <m-button type="danger"  :disabled="isDisabled" :loading="isLoading" :shape="shape">Danger</m-button>
    <m-button type="success" :disabled="isDisabled" :loading="isLoading" :shape="shape">Success</m-button>
    
    <div>
      <label>
        <input type="radio" id="shape" v-model="shape" value="solid" />
        solid
      </label>
      <label>
        <input type="radio" id="shape" v-model="shape" value="outline" />
        outline
      </label>
      <label>
        <input type="radio" id="shape" v-model="shape" value="flat" />
        flat
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="isDisabled" />
        Disabled
      </label>
      <label>
        <input type="checkbox" v-model="isLoading" />
        Loading
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ButtonShape, Button as MButton} from '@mirai-ui/vue-components';
import { ref } from 'vue';
const shape = ref<ButtonShape>('solid');
const isDisabled = ref(false);
const isLoading = ref(false);
</script>