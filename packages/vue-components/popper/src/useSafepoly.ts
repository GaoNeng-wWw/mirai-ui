import { Middleware } from '@floating-ui/vue';
import { computed, ref, Ref, watch } from 'vue';

export const useClamp = (min: number, max: number) => (val: number) => {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
};


export const clean = (el: HTMLElement) => {
  el.style.top = '';
  el.style.right = '';
  el.style.bottom = '';
  el.style.left = '';
};
export const useSafePolygon = (
  safePoly: Ref<HTMLElement | undefined>,
):Middleware => {
  let safePolyEl: HTMLElement | null = null;
  let hasListener = false;
  const x = ref('50%');
  const y = ref('50%');
  const onMouseMove = (
    floating: HTMLElement,
    trigger: HTMLElement,
    clampX: (val: number) => number,
    clampY: (val: number) => number,
  ) => (cvt: MouseEvent) => {
    x.value = `${
      Math.floor(Math.abs(floating.offsetWidth / trigger.offsetWidth - 1) * (trigger.offsetWidth / 2) + clampX(cvt.offsetX))
    }px`;
    y.value = `${
      Math.abs(
        Math.floor(Math.abs((floating.offsetHeight / trigger.offsetHeight - 1)) * (trigger.offsetHeight / 2) + clampY(cvt.offsetY))
      )
    }px`;
  };
  const placement = ref('');
  const triggerPlacementUpdate = computed(() => {
    if (placement.value.startsWith('top')) {
      return `0 0, 100% 0, ${x.value} 100%`;
    }
    if (placement.value.startsWith('bottom')) {
      return `${x.value} 0, 100% 100%, 0% 100%`;
    }
    if (placement.value.startsWith('right')) {
      return `0% ${y.value}, 100% 0, 100% 100%`;
    }
    if (placement.value.startsWith('left')) {
      return `100% ${y.value}, 0 0, 0 100%`;
    }
    return '';
  });
  watch(triggerPlacementUpdate, () => {
    if (safePolyEl) {
      safePolyEl.style.clipPath = `polygon(${triggerPlacementUpdate.value})`;
    }
  });
  let mouseMoveListener: ((cvt: MouseEvent) => void) | null = null;
  return {
    name: '',
    fn: (state) => {
      if (!safePolyEl && safePoly.value) {
        safePolyEl = safePoly.value;
      }
      if (!safePolyEl) {
        return state;
      }
      const { middlewareData } = state;
      placement.value = state.placement;
      const trigger = state.elements.reference;
      const offset = Math.abs(middlewareData.offset?.x || middlewareData.offset?.y || 0);
      clean(safePolyEl);
      if (trigger instanceof HTMLElement) {
        if (!mouseMoveListener) {
          const clampY = useClamp(0, trigger.offsetHeight);
          const clampX = useClamp(0, trigger.offsetWidth);
          mouseMoveListener = onMouseMove(
            state.elements.floating,
            trigger,
            clampX,
            clampY
          );
        }
        if (!hasListener) {
          trigger.addEventListener('mousemove', mouseMoveListener);
          hasListener = true;
        }
      }
      if (placement.value.startsWith('left')) {
        safePolyEl.style.width = `${offset}px`;
        safePolyEl.style.height = '100%';
        safePolyEl.style.right = '0';
        safePolyEl.style.transform = `translateX(${offset}px)`;
        return state;
      }
      if (placement.value.startsWith('right')) {
        safePolyEl.style.width = `${offset}px`;
        safePolyEl.style.height = '100%';
        safePolyEl.style.transform = `translateX(-${offset}px)`;
        safePolyEl.style.left = '0';
        return state;
      }
      if (placement.value.startsWith('bottom')) {
        safePolyEl.style.width = '100%';
        safePolyEl.style.height=`${offset}px`;
        safePolyEl.style.top = '0';
        safePolyEl.style.transform = `translateY(-${offset}px)`;
        return state;
      }
      if (placement.value.startsWith('top')) {
        safePolyEl.style.width = '100%';
        safePolyEl.style.height=`${offset}px`;
        safePolyEl.style.bottom = '0%';
        safePolyEl.style.transform = `translateY(${offset}px)`;
        return state;
      }
      return state;
    }
  } as Middleware;
};