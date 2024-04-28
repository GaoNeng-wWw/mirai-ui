import { Placement } from '@floating-ui/vue';
import { ExtractPropTypes, PropType } from 'vue';

export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'

export const PopperProps = {
  show: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String as PropType<PopperTrigger>,
    default: 'click'
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  },
  offset: {
    type: Number,
    default: 16
  }
};

export type PopperPropsType = ExtractPropTypes<typeof PopperProps>;