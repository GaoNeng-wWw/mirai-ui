import { computed, ref, toRefs, watch } from 'vue';
import { PopperPropsType } from './popper.props';

export const useTrigger = <T extends Function>(props: PopperPropsType, emit: T) => {
  const { show, trigger } = toRefs(props);
  const visible = ref(show?.value ?? false);
  const controller = computed(() => show?.value !== undefined);
  if (controller.value) {
    watch(show!, () => {
      visible.value = show!.value!;
    });
  }
  const toggleVisible = (method: string, e:MouseEvent | FocusEvent) => {
    if (visible.value) {
      emit('beforeClose', { visible: visible.value, controller: controller.value, e });
    } else {
      emit('beforeOpen', { visible: visible.value, controller: controller.value, e });
    }
    if (trigger.value !== method) {
      return;
    }
    if (controller.value) {
      visible.value = show!.value!;
      return;
    }
    if (
      (trigger.value === 'hover' || trigger.value === 'focus') && visible.value
    ) {
      return;
    }
    visible.value = !visible.value;
    if (!visible.value) {
      emit('afterOpen', { visible: visible.value, controller: controller.value, e });
    } else {
      emit('afterClose', { visible: visible.value, controller: controller.value, e });
    }
  };
  const closeFloating = (e: FocusEvent) => {
    if (trigger.value !== 'hover' && trigger.value !== 'focus') {
      return;
    }
    if (controller.value) {
      return;
    }
    emit('beforeClose', { visible: visible.value, controller: controller.value, e });
    visible.value = false;
    emit('afterClose', { visible: visible.value, controller: controller.value, e });
  };
  const onContentMouseLeave = (e:MouseEvent) => {
    if (trigger.value !== 'hover') {
      return;
    }
    emit('beforeClose', { visible: visible.value, controller: controller.value, e });
    if (controller.value) {
      return;
    }
    visible.value = false;
    emit('afterClose', { visible: visible.value, controller: controller.value, e });
  };
  const onContentMouseEnter = (e:MouseEvent) => {
    if (trigger.value !== 'hover') {
      return;
    }
    emit('beforeOpen', { visible: visible.value, controller: controller.value, e });
    if (controller.value) {
      return;
    }
    if (trigger.value === 'hover') {
      visible.value = true;
    }
    emit('afterOpen', { visible: visible.value, controller: controller.value, e });
  };
  return {
    visible,
    toggleVisible,
    closeFloating,
    onContentMouseEnter,
    onContentMouseLeave,
  };
};