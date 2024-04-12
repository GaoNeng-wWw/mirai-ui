import { RendererElement } from 'vue';

export const useCollapse = () => {
  const events = {
    beforeEnter(el: RendererElement) {
      if (!el.dataset) { el.dataset = {}; }
  
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      if (el.style.height) { el.dataset.elExistsHeight = el.style.height; }
  
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },
  
    enter(el: RendererElement) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.dataset.elExistsHeight) {
        el.style.maxHeight = `${el.dataset.elExistsHeight}px`;
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = 0;
      }

      requestAnimationFrame(() => {
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
        el.style.overflow = 'hidden';
      });
    },
  
    afterEnter(el: RendererElement) {
      el.style.maxHeight = '';
      el.style.overflow = el.dataset.oldOverflow;
    },
  
    beforeLeave(el: RendererElement) {
      if (!el.dataset) { el.dataset = {}; }
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.dataset.elExistsHeight = el.offsetHeight;
  
      el.style.maxHeight = `${el.dataset.elExistsHeight}px`;
      el.style.overflow = 'hidden';
    },
  
    leave(el: RendererElement) {
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },
  };
  return { events };
};