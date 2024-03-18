import { ExtractPropTypes, PropType } from 'vue';

export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type ButtonShape = 'solid' | 'outline';

export const buttonProp = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'solid'
  }
} as const;

export type ButtonProp = ExtractPropTypes<typeof buttonProp>;