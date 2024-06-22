import { ComponentInternalInstance } from 'vue';
import { MessageHandle } from './message.prop';

export type InstanceContext = {
  id: string;
  vm: ComponentInternalInstance;
  handle: MessageHandle
}
export const instances:InstanceContext[] = [];
export const getInstance = (id: string) => instances.filter((instance) => instance.id === id)[0];
export const getInstanceGroup = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id);
  const cur = instances[idx];
  const prev = idx > 0 ? instances[idx-1] : null;
  return {
    prev,
    cur
  };
};
export const getOffset = (id: string, h:number, gap: number) => {
  const { prev } = getInstanceGroup(id);
  if (!prev) {
    return gap;
  }
  return prev.vm.exposed!.bottom.value + gap;
};