import { ExtractPropTypes, PropType } from 'vue';

export const checkboxProp = {
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: '',
    required: false
  },
  variant: {
    type: String as PropType<Variant>,
    default: 'info'
  }
};

export type Variant = 'primary' | 'info' | 'warning' | 'danger';
export type CheckboxProp = ExtractPropTypes<typeof checkboxProp>;