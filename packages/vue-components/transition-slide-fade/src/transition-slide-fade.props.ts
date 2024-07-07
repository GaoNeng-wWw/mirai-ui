import { ExtractPropTypes, PropType } from 'vue';

export type Direction = 'top' | 'left' | 'right' | 'bottom';

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
  }
};

export type TransitionSlideFadeProps = ExtractPropTypes<typeof transitionSlideFadeProps>;