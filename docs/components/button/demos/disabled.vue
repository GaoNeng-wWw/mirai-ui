<template>
  <div class="flex flex-wrap gap-3">
    <m-button disabled >
      按钮
    </m-button>
    <m-button  disabled type="primary">
      Primary
    </m-button>
    <m-button  disabled type="warning">
      Warning
    </m-button>
    <m-button  disabled type="danger">
      Danger
    </m-button>
    <m-button  disabled type="success">
      Success
    </m-button>
    
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton} from '@mirai-ui/vue-components';
</script>