import { ExtractPropTypes, PropType } from 'vue';

export type Direction = 'top' | 'left' | 'right' | 'bottom';
export type Hook<T = () => void> = T | T[];

export const transitionSlideFadeProps = {
  from: {
    type: String as PropType<Direction>,
    default: 'top'
  },
  to: {
    type: String as PropType<Direction>,
    default: 'top'
  },
  offset: {
    type: Number,
    default: 8
  },
  onBeforeEnter: {
    type: Function,
    default: () => {}
  },
  onEnter: {
    type: Function,
    default: () => {}
  },
  onLeave: {
    type: Function,
    default: () => {}
  }
};

export type TransitionSlideFadeProps = ExtractPropTypes<typeof transitionSlideFadeProps>;