import { Middleware, Placement } from '@floating-ui/vue';
import { computed, ref, Ref, watch } from 'vue';

const clean = (el: HTMLElement) => {
  el.style.top = '';
  el.style.right = '';
  el.style.bottom = '';
  el.style.left = '';
};

const resolveMiddleware = (
  safePolygonEl:HTMLElement,
  offset: number
):{
  middleware: Middleware,
  placement: Ref<Placement>,
} => {
  const placement: Ref<Placement> = ref('bottom');
  return {
    middleware: {
      name: 'SafePolygon',
      fn(state) {
        placement.value = state.placement;
        clean(safePolygonEl);
        if (placement.value.startsWith('left')) {
          safePolygonEl.style.width = `${offset}px`;
          safePolygonEl.style.height = '100%';
          safePolygonEl.style.right = '0';
          safePolygonEl.style.transform = `translateX(${offset}px)`;
          return state;
        }
        if (placement.value.startsWith('right')) {
          safePolygonEl.style.width = `${offset}px`;
          safePolygonEl.style.height = '100%';
          safePolygonEl.style.transform = `translateX(-${offset}px)`;
          safePolygonEl.style.left = '0';
          return state;
        }
        if (placement.value.startsWith('bottom')) {
          safePolygonEl.style.width = '100%';
          safePolygonEl.style.height=`${offset}px`;
          safePolygonEl.style.top = '0';
          safePolygonEl.style.transform = `translateY(-${offset}px)`;
          return state;
        }
        if (placement.value.startsWith('top')) {
          safePolygonEl.style.width = '100%';
          safePolygonEl.style.height=`${offset}px`;
          safePolygonEl.style.bottom = '0%';
          safePolygonEl.style.transform = `translateY(${offset}px)`;
          return state;
        }
        return state;
      },
    },
    placement
  };
};
const useClap = (min: number, max: number) => (val: number) => {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
};

const useClipPath = (
  placement: Ref<Placement>,
  floating: HTMLElement,
  trigger: HTMLElement
) => {
  const x = ref('50%');
  const y = ref('50%');
  const clampY = useClap(0, trigger.offsetHeight);
  const clampX = useClap(0, trigger.offsetWidth);
  trigger.addEventListener('mousemove', (ev) => {
    x.value = `${
      Math.floor(Math.abs(floating.offsetWidth / trigger.offsetWidth - 1) * (trigger.offsetWidth / 2) + clampX(ev.offsetX))
    }px`;
    y.value = `${
      Math.abs(
        Math.floor(Math.abs((floating.offsetHeight / trigger.offsetHeight - 1)) * (trigger.offsetHeight / 2) + clampY(ev.offsetY))
      )
    }px`;
  });
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
  return {
    triggerPlacementUpdate
  };
};

export const useSafePolygon = (
  trigger: Ref<HTMLElement | null>,
  el: Ref<HTMLElement|null>,
  floating: Ref<HTMLElement | null>,
  offset: Ref<number>
):Middleware => {
  if (!trigger.value || !el.value || !floating.value) {
    return {
      name: '',
      fn(state) {
        return state;
      },
    };
  }
  const { middleware, placement } = resolveMiddleware(el.value, offset.value);
  const triggerEl = trigger.value;
  const safePolygongEl = el.value;
  const floatingEl = floating.value;
  const { triggerPlacementUpdate } = useClipPath(placement, floatingEl, triggerEl);
  watch(triggerPlacementUpdate, () => {
    safePolygongEl.style.clipPath = `polygon(${triggerPlacementUpdate.value})`;
  });
  return middleware;
};