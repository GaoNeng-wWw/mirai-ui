import { FlipOptions, Middleware, Placement, ShiftOptions } from '@floating-ui/vue';
import { ExtractPropTypes, PropType } from 'vue';

export interface PopperEvent {
  visible: boolean;
  controller:boolean;
  e: MouseEvent | FocusEvent
}

export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'

export const PopperProps = {
  show: {
    type: Boolean,
    default: undefined
  },
  trigger: {
    type: String as PropType<PopperTrigger>,
    default: 'click'
  },
  autoPlacement: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  },
  offset: {
    type: Number,
    default: 4
  },
  flip: {
    type: Boolean,
    default: true
  },
  flipOption: {
    type: Boolean as PropType<FlipOptions>,
    default: {}
  },
  shift: {
    type: Boolean,
    default: false,
  },
  shiftOption: {
    type: Object as PropType<ShiftOptions>,
    default: {}
  },
  externalMiddleware: {
    type: Array as PropType<Middleware[]>,
    default: []
  }
};

export type PopperPropsType = ExtractPropTypes<typeof PopperProps>;