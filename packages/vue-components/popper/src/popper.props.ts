import { FlipOptions, Middleware, Placement, ShiftOptions } from '@floating-ui/core';
import { ExtractPropTypes, PropType } from 'vue';

export interface PopperEvent {
  visible: boolean;
  controller:boolean;
  e: MouseEvent | FocusEvent
}

export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'
export type PopperPlacement = Placement;
export type PopperFlipOptions = FlipOptions;
export type PopperShiftOptions = ShiftOptions;
export type PopperMiddlewares = Middleware[]

export const PopperProps = {

  /**
   * @description {zh} 受控模式
   * @description {en} visibility
   * @demo {zh} #基本用法
   */
  show: {
    type: Boolean,
    default: undefined
  },

  /**
   * @description {zh} 触发方法
   * @description {en} Trigger method
   * @demo {zh} #不同的触发方式
   */
  trigger: {
    type: String as PropType<PopperTrigger>,
    default: 'click'
  },

  /**
   * @description {zh} 是否自动设置位置
   * @description {en} Is the position automatically set
   * @demo {zh} #autoplacement
   */
  autoPlacement: {
    type: Boolean,
    default: false,
  },

  /**
   * @description {zh} 位置
   * @description {en} placement
   * @demo {zh} #基本用法
   */
  placement: {
    type: String as PropType<PopperPlacement>,
    default: 'bottom'
  },

  /**
   * @description {zh} 悬浮元素与trigger之间的偏移量
   * @description {en} The offset between suspended elements and triggers
   * @demo {zh} #偏移量
   */
  offset: {
    type: Number,
    default: 4
  },

  /**
   * @description {zh} 反转
   * @description {en} flip
   * @demo {zh} #反转
   */
  flip: {
    type: Boolean,
    default: false
  },
  flipOption: {
    type: Object as PropType<PopperFlipOptions>,
    default: {}
  },
  shift: {
    type: Boolean,
    default: false,
  },
  shiftOption: {
    type: Object as PropType<PopperShiftOptions>,
    default: {}
  },
  externalMiddleware: {
    type: Array as PropType<PopperMiddlewares>,
    default: []
  },
  safePolygon: {
    type: Boolean,
    default: false
  },
  safePolygonDebug: {
    type: Boolean,
    default: false,
  },
  safePolygonClass: {
    type: String,
    default :''
  }
} as const;

export type PopperPropsType = ExtractPropTypes<typeof PopperProps>;