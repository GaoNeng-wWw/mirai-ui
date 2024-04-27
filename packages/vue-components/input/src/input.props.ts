import { ExtractPropTypes, PropType } from 'vue';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'fill' | 'border';
export type InputColors = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type InputLabelPosition = 'top-outside' | 'top-inside' | 'left-outside';

export const inputProp = {

  /**
   * @description {zh} 输入框大小
   * @description {en} size of the input.
   * @demo {zh} 大小
   * @demo {en} size
   */
  size: {
    type: String as PropType<InputSize>,
    default: 'md'
  },

  /**
   * @description {zh} 输入框变种
   * @description {en} variant of the input.
   * @demo {zh} 变种
   * @demo {en} variant
   */
  variant: {
    type: String as PropType<InputVariant>,
    default: 'fill'
  },

  /**
   * @description {zh} 输入框主题颜色
   * @description {en} color of input
   * @demo {zh} 多种颜色
   * @demo {en} colors
   */
  colors: {
    type:String as PropType<InputColors>,
    default: 'default'
  },

  /**
   * @description {zh} 输入框的标签
   * @description {en} label of input
   * @demo {zh} label
   * @demo {en} label
   */
  label: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 输入框占位符
   * @description {en} placholder of input
   * @demo {zh} placeholder
   * @demo {en} placholder
   */
  placeholder: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 输入框标签位置, 当且仅当label属性不为空字符串时才生效
   * @description {en} label position of input, Only takes effect when the label property is not an empty string
   * @demo {zh} label-position
   * @demo {en} label-position
   */
  labelPosition: {
    type: String as PropType<InputLabelPosition>,
    default: 'top-inside'
  },

  /**
   * @description {zh} 当error属性为true时, 显示的内容
   * @description {en} When the error attribute is true, the displayed content
   * @demo {zh} errorMessage
   * @demo {en} errorMessage
   */
  errorMessage: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 错误态
   * @description {en} Error state
   * @demo {zh} errorMessage
   * @demo {en} errorMessage
   */
  error: {
    type: Boolean,
    default: false
  },

  /**
   * @description {zh} 输入框id
   * @description {en} Input id
   * @demo {zh} basic-usage
   * @demo {en} basic-usage
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * @description {zh} 描述, 一般位于input的最底部. 优先级比errorMessage低
   * @description {en} Description, usually located at the bottom of the input Priority is lower than errorMessage
   * @demo {zh} description
   * @demo {en} description
   */
  description: {
    type: String,
    default: '',
  },

  /**
   * @description {zh} 是否冻结label, 不产生位移.
   * @description {en} Whether to freeze the label without causing displacement
   * @demo {zh} slot
   * @demo {en} slot
   */
  freezeLabelPosition: {
    type: Boolean,
    default: false
  }
} as const;

export type InputProp = ExtractPropTypes<typeof inputProp>;
