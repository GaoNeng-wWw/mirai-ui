import { FlipOptions, Middleware, Placement, ShiftOptions, VirtualElement } from '@floating-ui/vue';
import { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'
export type PopperPlacement = Placement;
export type PopperFlipOptions = FlipOptions;
export type PopperShiftOptions = ShiftOptions;
export type PopperMiddlewares = Middleware[]

export type VirtualTrigger = VirtualElement;

export const PopperProp = {
  virtualTrigger: {
    type: Boolean,
    default: false
  },
  triggerRef: {
    type: Object as PropType<HTMLElement | VirtualTrigger>
  },
  placement: {
    type: String as PropType<PopperPlacement>,
    default: 'top'
  },
  autoPlacement: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 8
  },
  flip: {
    type: Boolean,
    default: true
  },
  middlewares: {
    type: Array as PropType<PopperMiddlewares>,
    default: []
  },
  safepoly: {
    type: Boolean,
    default: true
  },
  safepolyDebug: {
    type: Boolean,
    default: false
  }
};
export const PopperTriggerProp = {
  virtualTrigger: {
    type: Boolean,
    default: false,
  },
  triggerRef: {
    type: Object as PropType<HTMLElement>
  }
};

export type PopperProp = ExtractPropTypes<typeof PopperProp>;
export interface PopperContext {
  trigger: Ref<HTMLElement | VirtualTrigger | undefined>,
  content: Ref<HTMLElement | undefined>,
  safePoly: Ref<HTMLElement | undefined>,
  virtualTrigger: Ref<boolean>,
  placement: ComputedRef<PopperPlacement>,
  autoPlacement: ComputedRef<boolean>,
  offset: ComputedRef<number>,
  flip: ComputedRef<boolean>,
  middlewares: ComputedRef<PopperMiddlewares>,
  safepoly: ComputedRef<boolean>,
  safepolyDebug: ComputedRef<boolean>
}

export const KEY = Symbol();