<template>
  <div class="w-full">
    <div v-for="{propsName, datas} of (tableData as TableData)">
      <h3>{{ propsName }}</h3>
      <table>
        <th v-for="title of tableHeader">
          {{ title[shortLang] }}
        </th>
        <template v-for="item of datas">
          <tr style="position: relative">
            <td v-for="{id:key} of tableHeader">
              <template v-if="key === 'type' || key === 'demo'">
                <template v-if="item[key].name && item[key].href">
                  <a :href="`${item[key].href}`">
                    {{ item[key].name }}
                  </a>
                </template>
                <template v-else>
                  {{ item[key].name }}
                </template>
              </template>
              <template v-else>
                <template v-if="item[key]?.value">
                  {{ item[key].value }}
                </template>
              </template>
            </td>
            <div class="delete-line" v-if="item['deprecated'] && item['deprecated'].value.length"></div>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const tableHeader = [
  {
    id: 'name',
    zh: '参数名',
    en: 'Name'
  },
  {
    id: 'type',
    zh: '参数类型',
    en: 'Type'
  },
  {
    id: 'description',
    zh: '简介',
    en: 'Description'
  },
  {
    id: 'demo',
    zh: '示例链接',
    en: 'Demo'
  },
  {
    id: 'default',
    zh: '默认值',
    en: 'Default'
  },
  {
    id: 'deprecated',
    zh: '废弃理由',
    en: 'Deprecated Reason'
  },
]

type RawTableData = {
    props: {
      name: string;
      type: {
        ref: boolean;
        name: string;
      };
      description: {
        [lang:string]: string;
      };
      deprecated: {
        [lang:string]: string;
      };
      demo: {
        [lang:string]: string;
      };
      default: string
    }[];
    propsName: string;
}[]
type TableData = {
  propsName:string;
  datas: {
    name: {
      value: string
    };
    type: {
      name: string;
      href: string;
    };
    description: {
      value: string;
    };
    deprecated: {
      value: string;
    };
    demo: {
      name: string;
      href: string;
    };
    default: {
      value: string;
    }
  }[]
}[]
const props = defineProps<{
  tableData: string;
}>();
const {lang} = useData();
const shortLang = computed(() => lang.value.split('-')[0]);
const tableData = computed(()=>{
  const rawData=JSON.parse(props.tableData) as RawTableData;
  const data: TableData = [];
  for (const raw of rawData){
    const tableProps:TableData[number]['datas'] = raw.props.map((p) => {
      return {
        name: {
          value: p.name
        },
        type: {
          name: p.type.name,
          href: p.type.ref ? '#types' : ''
        },
        description: {
          value: p.description[shortLang.value] ?? p.description['en']
        },
        deprecated: {
          value: p.deprecated[shortLang.value] ?? p.description['en']
        },
        demo: {
          name: p.demo[shortLang.value] ?? p.demo['en'],
          href: p.demo[shortLang.value] ?? p.demo['en']
        },
        default: {
          value: p.default
        }
      }
    });
    data.push({
      propsName: raw.propsName,
      datas: tableProps
    })
  }
  console.log(data)
  return data;
});
</script>

<style>
.delete-line{
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 2px;
  background: black;
}
</style>