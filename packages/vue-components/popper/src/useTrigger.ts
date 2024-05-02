import { computed, ref, toRefs, watch } from 'vue';
import { PopperPropsType } from './popper.props';

export const useTrigger = <T extends Function>(props: PopperPropsType, emit: T) => {
  const { show } = toRefs(props);
  const visible = ref(show?.value ?? false);
  const controller = computed(() => show?.value !== undefined);
  if (controller.value) {
    watch(show!, () => {
      visible.value = show!.value!;
    });
  }
  const toggleVisible = () => {
    if (controller.value) {
      return;
    }
    visible.value = !visible.value;
  };
  const onClick = (e:MouseEvent | FocusEvent) => {
    if (!visible.value) {
      emit('beforeOpen', { visible: visible.value, controller: controller.value, e });
    } else {
      emit('beforeClose', { visible: visible.value, controller: controller.value, e });
    }
    toggleVisible();
    if (!visible.value) {
      emit('afterClose', { visible: visible.value, controller: controller.value, e });
    } else {
      emit('afterOpen', { visible: visible.value, controller: controller.value, e });
    }
  };

  const open = (e: MouseEvent | FocusEvent) => {
    emit('beforeOpen', { visible: visible.value, controller: controller.value, e });
    visible.value = true;
    emit('afterOpen', { visible: visible.value, controller: controller.value, e });
  };
  const close = (e:MouseEvent | FocusEvent) => {
    emit('beforeClose', { visible: visible.value, controller: controller.value, e });
    visible.value = false;
    emit('afterClose', { visible: visible.value, controller: controller.value, e });
  };

  return {
    open,
    close,
    onClick,
    visible,
  };
};