import { Ref } from 'vue';

export type CollapseProvide = {
  modelValue: (string|number|symbol)[];
  disabledKeys: (Ref<string|number|symbol>)[]
  onItemClick: (key: string | number | symbol)=>void
}