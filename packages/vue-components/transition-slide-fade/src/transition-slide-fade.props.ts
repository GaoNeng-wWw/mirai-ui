import { ExtractPropTypes, PropType } from 'vue';

export type Direction = 'top' | 'left' | 'right' | 'bottom';
export type Hook<T = () => void> = T | T[];

export const transitionSlideFadeProps = {
  
  /**
   * @description {zh} 元素从哪里出现
   * @description {en} Where do elements appear from
   * @demo {zh} #基本用法
   */
  from: {
    type: String as PropType<Direction>,
    default: 'top'
  },
  /**
   * @description {zh} 元素从哪里离开
   * @description {en} Where do elements leave from
   * @demo {zh} #基本用法
   */
  to: {
    type: String as PropType<Direction>,
    default: 'top'
  },

  /**
   * @description {zh} 位移距离
   * @description {en} Displacement distance
   * @demo {zh} #基本用法
   */
  offset: {
    type: Number,
    default: 8
  },

  /**
   * @description {zh} 进入前执行的事件
   * @description {en} Events executed before entering
   * @demo {zh} #基本用法
   */
  onBeforeEnter: {
    type: Function,
    default: () => {}
  },

  /**
   * @description {zh} 元素显示后触发的事件
   * @description {en} Events triggered after element display
   * @demo {zh} #基本用法
   */
  onEnter: {
    type: Function,
    default: () => {}
  },

  /**
   * @description {zh} 元素离开触发的事件
   * @description {en} Event triggered by element departure
   * @demo {zh} #基本用法
   */
  onLeave: {
    type: Function,
    default: () => {}
  }
};

export type TransitionSlideFadeProps = ExtractPropTypes<typeof transitionSlideFadeProps>;