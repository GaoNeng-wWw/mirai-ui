<template>
  <div class="flex gap-3 flex-col">
    <div class="flex flex-wrap gap-3">
      <m-button :disabled="isDisabled" >
        按钮
      </m-button>
      <m-button  :disabled="isDisabled" type="primary">
        Primary
      </m-button>
      <m-button  :disabled="isDisabled" type="warning">
        Warning
      </m-button>
      <m-button  :disabled="isDisabled" type="danger">
        Danger
      </m-button>
      <m-button  :disabled="isDisabled" type="success">
        Success
      </m-button>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="isDisabled" />
        Disabled
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton} from '@mirai-ui/vue-components';
import { ref } from 'vue';
const isDisabled = ref(false);
</script>