import { ExtractPropTypes, PropType } from 'vue';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type ButtonShape = 'solid' | 'outline';

export const buttonProp = {

  /**
   * @description {zh} 按钮颜色
   * @description {en} Color of button
   * @demo {zh} #快速使用
   * @demo {en} #Quick-Start
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },

  /**
   * @description {zh} 按钮形状
   * @description {en} Shape of Button
   * @demo {zh} #快速使用
   * @demo {en} #Quick-Start
   */
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'solid',
  },

  /**
   * @description {zh} 按钮是否加载
   * @description {en} Is the button in loading state
   * @demo {zh} #快速使用
   * @demo {en} #Quick-Start
   */
  loading: {
    type: Boolean,
    default:false,
  },

  /**
   * @description {zh} 按钮大小
   * @description {en} Button size
   * @demo {zh} #快速使用
   * @demo {en} #快速使用
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md'
  }
} as const;

export type ButtonProp = ExtractPropTypes<typeof buttonProp>;