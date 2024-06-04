<template>
  <slot v-if="!virtualTrigger" />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { KEY, PopperContext } from './popper.props';


const name = 'MPopperTrigger';
defineOptions({ name });
const { virtualTrigger } = inject<PopperContext>(KEY)!;
</script>