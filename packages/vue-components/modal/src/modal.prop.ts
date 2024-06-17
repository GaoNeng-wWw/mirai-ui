import { MaskType } from '@miraiui-org/vue-mask';
import { ExtractPropTypes, PropType } from 'vue';

export type ModalRounded = 'none' | 'sm' | 'md' | 'lg'

export const modalProps = {

  /**
   * @description {zh} 用于设置modal的title, 在使用插槽的时候会被覆盖
   * @description {en} This prop is used to set the title of the modal, which will be overwritten when using the slot
   * @demo {zh} #使用插槽
   */
  title: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 用于设置modal的content, 在使用插槽的时候会被覆盖
   * @description {en} This prop is used to set the content of the modal, which will be overwritten when using the slot
   * @demo {zh} #使用插槽
   */
  content: {
    type: String,
    default: ''
  },

  /**
   * @description {zh} 用于设置整个modal的圆角
   * @description {en} Used to set the rounded corners of the entire modal
   */
  rounded:{
    type: String as PropType<ModalRounded>,
    default: 'md'
  },

  /**
   * @description {zh} 显式声明modal的宽度
   * @description {en} Used to set the width of the modal
   */
  width: {
    type: Number,
    default: 0
  },

  /**
   * @description {zh} 显式声明modal的遮罩的样式，详细可以参考 Mask 组件
   * @description {en} Used to set the mask type of modal, ref: Mask components
   * @demo {zh} #自定义遮罩类型
   */
  maskType:{
    type: String as PropType<MaskType>,
    defualt: 'fill'
  }
};

export type ModalProps = ExtractPropTypes<typeof modalProps>