<template>
  <table class="min-w-64 w-full">
    <thead>
      <tr>
        <th v-for="[header,id] of tableHeader" :key="id">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of tableData">
        <template v-for="(col,key) of row">
          <td v-if="col && col.startsWith('#')">
            <a :href="col">
              {{ col }}
            </a>
          </td>
          <td v-else>
            {{ col }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import {useData} from 'vitepress';
import { computed } from 'vue';
import Data from '../props-table-data.json';
interface DataIndex {
  name: string;
  type: string;
  description: {
    [lang: string]: string;
  };
  demo: {
    [lang: string]: string;
  };
  deprecated: {
    [lang: string]: string;
  }
  defaultValue: string;
}
const index = [
  {
    title: {
      zh: '参数名',
      en: 'Name'
    },
    id: 'name'
  },
  {
    title: {
      zh: '参数类型',
      en: 'Type'
    },
    id: 'type'
  },
  {
    title: {
      zh: '类型简介',
      en: 'Description'
    },
    id: 'description'
  },
  {
    title:{
      zh: '示例',
      en: 'Demo'
    },
    id: 'demo'
  },
  {
    title:{
      zh: '默认值',
      en: 'Defalut Value'
    },
    id: 'defaultValue'
  }
] as const;

const props = defineProps<{
  componentName: string
}>()

const data = computed<DataIndex[]>(()=> Data[props.componentName]);

const {lang} = useData();
const shortLang = computed(() => lang.value.split('-')[0]);
const tableHeader = computed(()=>{
  return index.map<string[]>((item) => [item.title[shortLang.value] ?? item.title['en'], item.id])
})
const tableData = computed(() => {
  const res:string[][] = [];
  for (const item of data.value){
    const tmp:string[] = [];
    for (const {id} of index){
      if (id === 'name' || id === 'type' || id === 'defaultValue'){
        tmp.push(item[id]);
      } else {
        if (item[id]?.[shortLang.value] || item[id]?.['en']){
          tmp.push(item[id][shortLang.value] ?? item[id]['en']);
        } else {
          tmp.push('-')
        }
      }
    }
    res.push(tmp);
  }
  return res;
})

</script>