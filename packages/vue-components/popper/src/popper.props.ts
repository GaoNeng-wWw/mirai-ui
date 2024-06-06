import { FlipOptions, Middleware, Placement, ShiftOptions, VirtualElement } from '@floating-ui/vue';
import { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';

export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'
export type PopperPlacement = Placement;
export type PopperFlipOptions = FlipOptions;
export type PopperShiftOptions = ShiftOptions;
export type PopperMiddlewares = Middleware[]

export type VirtualTrigger = VirtualElement;

export const PopperProp = {

  /**
   * @description {zh} 是否使用虚拟触发器
   * @description {en} Whether to use virtual triggers
   * @demo {zh} #虚拟触发
   */
  virtualTrigger: {
    type: Boolean,
    default: false
  },

  /**
   * @description {zh} 虚拟触发器元素
   * @description {en} Virtual Trigger Element
   * @demo {zh} #虚拟触发
   */
  triggerRef: {
    type: Object as PropType<HTMLElement | VirtualTrigger>
  },

  /**
   * @description {zh} 默认位置
   * @description {en} default placement
   * @demo {zh} #基本用法
   */
  placement: {
    type: String as PropType<PopperPlacement>,
    default: 'top'
  },

  /**
   * @description {zh} 是否自动选择位置
   * @description {en} Automatically select position
   * @demo {zh} #基本用法
   */
  autoPlacement: {
    type: Boolean,
    default: false
  },

  /**
   * @description {zh} 浮动元素与触发器之间的偏移量
   * @description {en} The offset between floating elements and triggers
   * @demo {zh} #响应式
   */
  offset: {
    type: Number,
    default: 8
  },

  /**
   * @description {zh} 是否自动翻转位置
   * @description {en} Whether to automatically flip the position
   */
  flip: {
    type: Boolean,
    default: true
  },

  /**
   * @description {zh} 自定义中间件
   * @description {en} Custom middleware
   */
  middlewares: {
    type: Array as PropType<PopperMiddlewares>,
    default: []
  },

  /**
   * @description {zh} 安全三角形
   * @description {en} Safe Triangle
   */
  safepoly: {
    type: Boolean,
    default: true
  },

  /**
   * @description {zh} 是否显示安全三角
   * @description {en} Is the security triangle displayed
   */
  safepolyDebug: {
    type: Boolean,
    default: false
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