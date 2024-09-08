export type CollapseProvide = {
  modelValue: (string|number|symbol)[];
  disabledKeys: (string|number|symbol)[];
  onItemClick: (key: string | number | symbol)=>void;
  open: (key: string | number | symbol) => void,
  close: (key: string | number | symbol) => void,
  beforeOpen: (key: string | number | symbol, next: ()=>void) => boolean,
  beforeClose: (key: string | number | symbol, next: ()=>void) => boolean,
}