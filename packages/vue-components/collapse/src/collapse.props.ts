import { ExtractPropTypes, PropType } from 'vue';

export type CollapseSize = 'sm' | 'md' | 'lg';
export type CollapseRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type CollapseColor = 'default' | 'primary' | 'success'| 'danger' | 'warning';
export const collapseProps = {

  /**
   * @description {zh} 组件大小
   * @description {en} size of collapse component
   */
  size: {
    type: String as PropType<CollapseSize>,
    default: 'md'
  },

  /**
   * @description {zh} 组件圆角大小
   * @description {en} Component fillet size
   */
  radius: {
    type: String as PropType<CollapseRadius>,
    default: 'md'
  },

  /**
   * @description {zh} 组件颜色
   * @description {en} Component color
   * @demo {zh} #不同颜色
   */
  color: {
    type: String as PropType<CollapseColor>,
    default: 'default',
    requried: false
  },

  /**
   * @description {zh} 如果为true, 则一次只能展开一个collapse-item
   * @description {en} If true, only one collapse item can be expanded at a time
   */
  accordion: {
    type: Boolean,
    default: false
  },

  /**
   * @description {zh} 定义哪些展开项不允许交互 
   * @description {en} Define which expansion items do not allow interaction
   */
  disabledKeys: {
    type: Array as PropType<(string|number|symbol)[]>,
    default: []
  },

  /**
   * @description {zh} 初始化时是否允许运行 Open 事件
   * @description {en} Is it allowed to run Open events during initialization
   */
  allowInitOpenEvent: {
    type: Boolean,
    default: false
  },

  onBeforeClose: {
    type: Function as PropType<(key: string | number | symbol, done: ()=>void)=>void>,
  },
  onBeforeOpen: {
    type: Function as PropType<(key: string | number | symbol, done: ()=>void)=>void>,
  }
} as const;

export const collapseItemProps = {

  /**
   * @description {zh} 标题
   * @description {en} Title
   */
  title: {
    type: String,
    required: true
  },

  /**
   * @description {zh} 是否禁用
   * @description {en} Is it disabled
   */
  disabled: {
    type: Boolean,
    default: false
  }
};

export const CONSTANT = Symbol('collapse');

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;