<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, ref, useSlots } from 'vue';
import { codeToHtml } from 'shiki';
defineOptions({
  name: 'Demo',
});
const props = defineProps<{
  componentName: string;
  demoName: string;
  code: string;
}>();
const component = props.componentName ? defineAsyncComponent(() => import(`../../components/${props.componentName}/demos/${props.demoName}.vue`)) : null;
const expand = ref(false);
const expandTip = computed(() => expand.value ? '收起' : '展开');
const changeExpand = () => {
  expand.value = !expand.value;
};
const highLightCode = ref(
  await codeToHtml(props.code, {
    lang: 'vue',
    theme: 'dark-plus',
  }),
);
onMounted(() => {
  new MutationObserver(() => {
    const mode = document.body.parentElement?.className === 'dark' ? 'dark' : 'light';
    codeToHtml(props.code, {
      lang: 'vue',
      theme: `${mode}-plus`,
    })
      .then((code) => {
        highLightCode.value = code;
      });
  })
    .observe(document.body.parentElement!, { attributes: true });
});

const slots = useSlots();

const defaultSlots = slots.defualt?.();

const defaultSlotHasNode = computed(() => defaultSlots?.length);
</script>

<template>
  <div class="w-full h-fit border border-DEFAULT-300 rounded flex flex-col gap-2 mt-2 placeholder-rose-50 not-prose">
    <div class="w-full h-fit rounded-md px-4 py-2 font-display">
      <component :is="component" />
    </div>
    <div>
      <div class="w-full h-px bg-DEFAULT-300 font-display" />
      <p class="m-0 text-center cursor-pointer py-4 dark:text-default-500 dark:hover:text-default-800" @click="changeExpand">
        {{ expandTip }}
      </p>
      <div v-if="expand" class="w-full bg-foreground-100 p-2 space-y-4">
        <div v-if="defaultSlotHasNode" class="w-full bg-DEFAULT-200 p-4 rounded">
          <component :is="defaultSlots" />
        </div>
        <pre class="*:bg-transparent! overflow-auto bg-transparent text-sm px-2" v-html="highLightCode" />
      </div>
    </div>
  </div>
</template>
