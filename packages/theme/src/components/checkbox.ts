import { cva, VariantProps } from 'cva';

export const checkIcon = cva({
  base: [
    'transition-all duration-fast ease-quint',
    'data-[visible=true]:[stroke-dashoffset:0] data-[visible=true]:bg-red-500',
    'data-[visible=false]:[stroke-dashoffset:200]'
  ],
});

export const checkboxWrapper = cva({
  base: [
    'text-default-foreground'
  ],
  variants: {
    disabled: {
      true: '',
      false: ''
    },
    indeterminate: {
      true: '',
      false: ''
    }
  }
} as const);

export const checkbox = cva({
  base: [
    'rounded w-8 h-8 inline-block',
  ],
  variants: {
    disabled: {
      true: '',
      false: ''
    },
    indeterminate: {
      true: '',
      false: ''
    },
    variant: {
      info: 'bg-default',
      primary: 'bg-primary',
      warning: 'bg-warning',
      danger: 'bg-danger',
    }
  }
} as const);

export type CheckboxWrapperType = VariantProps<typeof checkboxWrapper>;
export type CheckboxType = VariantProps<typeof checkbox>;
export type CheckIconType = VariantProps<typeof checkIcon>;