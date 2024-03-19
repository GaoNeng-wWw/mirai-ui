import { ExtractPropTypes, PropType } from 'vue';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type ButtonShape = 'solid' | 'outline';

export const buttonProp = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'solid',
  },
  loading: {
    type: Boolean,
    default:false,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md'
  }
} as const;

export type ButtonProp = ExtractPropTypes<typeof buttonProp>;