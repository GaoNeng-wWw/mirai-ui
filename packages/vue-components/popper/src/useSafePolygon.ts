import { Middleware, Placement } from '@floating-ui/core';
import { computed, ref, Ref, watch } from 'vue';

const toPercent = (x: number) => Number.parseInt(String(x * 100));

const useMouseOut = (el: HTMLElement) => {
  const x = ref(50);
  const y = ref(50);
  el.addEventListener('mouseout', (ev) => {
    x.value = Math.min(Math.abs(toPercent(ev.offsetX / el.offsetWidth)), 100); 
    // Math.min((floating-height / trigger-height) - 1,1) * trigger-height + ev.offsetY
    y.value = Math.min(Math.abs(toPercent(ev.offsetY / el.offsetHeight)), 100);
  });
  return { x, y };
};

export const useSafePolygon = (
  trigger: Ref<HTMLElement | null>,
  el: Ref<HTMLElement|null>,
  offset: Ref<number>
) => {
  el.value!.dataset['display'] = el.value?.style.display;
  const _placement = ref<Placement>('bottom');
  const useClipPath = () => {
    const { x, y } = useMouseOut(trigger.value!);
    const triggerPlacementUpdate = computed(() => {
      if (_placement.value.startsWith('top')) {
        return '0 0, 100% 0, 50% 100%';
      }
      if (_placement.value.startsWith('bottom')) {
        return '50% 0, 100% 100%, 0% 100%';
      }
      if (_placement.value.startsWith('right')) {
        return '0% 50%, 100% 0, 100% 100%';
      }
      if (_placement.value.startsWith('left')) {
        return `100% ${y.value}%, 0 0, 0 100%`;
      }
      return '';
    });

    watch(triggerPlacementUpdate, () => {
      el.value!.style.clipPath = `polygon(${triggerPlacementUpdate.value})`;
      console.log(el.value?.style.clipPath);
    });
    watch(_placement, () => {
      const polygonString = triggerPlacementUpdate.value;
      el.value!.style.clipPath = `polygon(${polygonString})`;
    });
    return { triggerPlacementUpdate };
  };
  const { triggerPlacementUpdate } = useClipPath();
  const middleware = {
    name: 'SafePolygon',
    fn(state) {
      const h = offset.value;
      const { placement } = state;
      if (!el.value || !trigger.value) {
        return state;
      }
      _placement.value = placement;
      watch(triggerPlacementUpdate, () => {
        el.value!.style.clipPath = `polygon(${triggerPlacementUpdate.value})`;
      });
      if (placement.startsWith('left')) {
        el.value.style.width = `${h}px`;
        el.value.style.height = '100%';
        el.value.style.right = '0';
        el.value.style.transform = `translateX(${h}px)`;
        return state;
      }
      if (placement.startsWith('right')) {
        el.value.style.width = `${h}px`;
        el.value.style.height = '100%';
        // console.log(reference);
        el.value.style.transform = `translateX(-${h}px)`;
        el.value.style.bottom = '';
        el.value.style.top = '';
        return state;
      }
      if (placement.startsWith('bottom')) {
        el.value.style.width = '100%';
        el.value.style.height=`${h}px`;
        el.value.style.top = '0';
        el.value.style.transform = `translateY(-${h}px)`;
        return state;
      }
      if (placement.startsWith('top')) {
        el.value.style.width = '100%';
        el.value.style.height=`${h}px`;
        el.value.style.top = '';
        el.value.style.bottom = '0%';
        el.value.style.transform = `translateY(${h}px)`;
        return state;
      }
      return state;
    },
  } as Middleware;
  return middleware;
};