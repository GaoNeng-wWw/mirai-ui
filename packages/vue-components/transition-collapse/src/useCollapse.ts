import type { RendererElement } from 'vue';

export const useCollapse = () => {
  const reset = (el: RendererElement) => {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  };
  const getPadding = (el: RendererElement) => {
    const computedStyle = getComputedStyle(el as HTMLElement);
    return {
      top: computedStyle.paddingTop,
      left: computedStyle.paddingLeft,
      right: computedStyle.paddingRight,
      bottom: computedStyle.paddingBottom
    };
  };
  const events = {
    beforeEnter(el: RendererElement) {
      if (!el.dataset) { el.dataset = {}; }
      const { top, bottom } = getPadding(el);
      el.dataset.oldPaddingTop = top;
      el.dataset.oldPaddingBottom = bottom;
      const h = getComputedStyle(el as HTMLElement).height;
      if (h) { el.dataset.elExistsHeight = h; }
  
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },
  
    enter(el: RendererElement) {
      requestAnimationFrame(() => {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.dataset.elExistsHeight) {
          el.style.maxHeight = el.dataset.elExistsHeight;
        } else if (el.scrollHeight !== 0) {
          el.style.maxHeight = `${el.scrollHeight }px`;
        } else {
          el.style.maxHeight = 0;
        }
  
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
        el.style.overflow = 'hidden';
      });
    },
  
    afterEnter(el: RendererElement) {
      el.style.maxHeight = '';
      el.style.overflow = el.dataset.oldOverflow;
    },
  
    enterCancelled(el: RendererElement) {
      reset(el);
    },
  
    beforeLeave(el: RendererElement) {
      if (!el.dataset) { el.dataset = {}; }
      const { top, bottom } = getPadding(el);
      el.dataset.oldPaddingTop = top;
      el.dataset.oldPaddingBottom = bottom;
      el.dataset.oldOverflow = el.style.overflow;
  
      el.style.maxHeight = `${el.offsetHeight}px`;
      el.style.overflow = 'hidden';
    },
  
    leave(el: RendererElement) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },
  
    afterLeave(el: RendererElement) {
      reset(el);
    },
  
    leaveCancelled(el: RendererElement) {
      reset(el);
    },
  };
  return { events };
};