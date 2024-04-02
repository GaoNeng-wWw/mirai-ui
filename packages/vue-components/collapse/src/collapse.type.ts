export type CollapseProvide = {
  modelValue: (string|number|symbol)[];
  disabledKeys: (string|number|symbol)[]
  onItemClick: (key: string | number | symbol)=>void
}