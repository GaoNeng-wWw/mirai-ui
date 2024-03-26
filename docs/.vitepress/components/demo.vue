<template>
    <div class="w-full h-fit border border-foreground-300 p-2 rounded flex flex-col gap-2 mt-2">
        <div class="w-full h-fit rounded-md px-4 py-2">
            <component :is="component" />
        </div>
        <div class="">
            <p class="m-0 text-center cursor-pointer dark:text-default-700 dark:hover:text-default-800" @click="changeExpand">
                {{expandTip}}
            </p>
            <div class="w-full p-2 bg-foreground-100" v-if="expand">
    <pre v-html="highLightCode" class="*:!bg-transparent"></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent, onMounted, ref} from 'vue';
import {codeToHtml} from 'shiki';
const props = defineProps<{
    componentName: string;
    demoName: string;
    code: string
}>();
defineOptions({
    name: 'demo'
})
const component = props.componentName ? defineAsyncComponent(()=>import(`../../components/${props.componentName}/demos/${props.demoName}.vue`)) : null;
const expand = ref(false);
const expandTip = computed(()=>expand.value ? '收起' : '展开')
const changeExpand = () => {
    expand.value = !expand.value
}
const highLightCode = ref(
    await codeToHtml(props.code, {
        lang: 'vue',
        theme: 'dark-plus'
    })
)
onMounted(()=>{
    new MutationObserver(()=>{
        const mode = document.body.parentElement?.className === 'dark' ? 'dark' : 'light';
        codeToHtml(props.code, {
            lang: 'vue',
            theme: `${mode}-plus`
        })
        .then((code)=>{
            highLightCode.value = code;
        })
    })
    .observe(document.body.parentElement!, {attributes: true})
})
</script>