import { ExtractPropTypes, PropType } from 'vue';

export type ModalRounded = 'none' | 'sm' | 'md' | 'lg'

export const modalProps = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  rounded:{
    type: String as PropType<ModalRounded>,
    default: 'md'
  },
  width: {
    type: Number,
    default: 0
  }
};

export type ModalProps = ExtractPropTypes<typeof modalProps>