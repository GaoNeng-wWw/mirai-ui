import { computed, ref, toRefs, watch } from 'vue';
import { PopperPropsType } from './popper.props';

export const useTrigger = <T extends Function>(props: PopperPropsType, emit: T) => {
  const { show } = toRefs(props);
  const visible = ref(show?.value ?? false);
  const controller = computed(() => show?.value !== undefined);
  let timer: null | NodeJS.Timeout = null;
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
    if (props.trigger !== 'click') {
      return;
    }
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
  const onFocus = (e: FocusEvent) => {
    if (props.trigger !== 'focus') {
      return; 
    }
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
  const onContext = (e: MouseEvent) => {
    if (props.trigger !== 'contextmenu') {
      return;
    }
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
  const onHover = (e:MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (props.trigger === 'hover') {
      open(e);
    }
  };
  const onHoverLeave = (e:MouseEvent) => {
    if (props.trigger === 'hover') {
      timer = setTimeout(() => {
        close(e);
      }, 300);
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
    onHover,
    onHoverLeave,
    onContext,
    onFocus,
    visible,
  };
};