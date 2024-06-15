import { Ref } from 'vue';

type VisibleTask = {
  type: 'open' | 'close',
  fn: (visible: boolean)=>void;
}

export const useVisible = (
  defaultVisible: Ref<boolean>
) => {
  const visible = defaultVisible;
  const tasks: VisibleTask[] = [];
  const onOpen: (cb: (visible:boolean)=>void) => void = (cb) => {
    tasks.push({ type: 'open', fn: cb });
  };
  const onClose:(cb: (visible:boolean)=>void) => void = (cb) => {
    tasks.push({ type: 'close', fn: cb });
  };
  const trigger = (type: 'open' | 'close') => {
    tasks.filter((task) => task.type === type).forEach(({ fn }) => {
      fn(visible.value);
    });
  };
  const open = () => {
    visible.value = true;
    trigger('open');
  };
  const close = () => {
    visible.value = false;
    trigger('close');
  };
  const toggle = () => {
    visible.value = !visible.value;
    trigger(
      visible.value ? 'open' : 'close'
    );
  };
  return {
    visible,
    onOpen,
    onClose,
    open,
    close,
    toggle
  };
  
};