import type { VariantProps } from 'cva';
import { cva } from 'cva';

export const button = cva({
  base: 'group inline-flex rounded px-3 py-1.5 outline-none transition-all active:scale-95',
  variants: {
    shape:{
      solid: 'border-none disabled:pointer-events-none disabled:text-white/50',
      outline: 'border-2 border-solid !bg-transparent hover:!bg-transparent active:!bg-transparent'
    },
    type: {
      default: [
        'bg-default border-default',
        'hover:bg-default/80',
        'active:bg-default',
        'disabled:bg-default/50',
      ],
      primary: [
        'bg-primary border-primary',
        'hover:bg-primary/80',
        'active:bg-primary',
        'disabled:bg-primary-500/50',
      ],
      warning: [
        'bg-warning border-warning',
        'hover:bg-warning/80',
        'active:bg-warning',
        'disabled:bg-warning/50',
      ],
      danger: [
        'bg-danger border-danger ',
        'hover:bg-danger/80',
        'active:bg-danger',
        'disabled:bg-danger/50',
      ],
      success: [
        'bg-success border-success',
        'hover:bg-success/80',
        'active:bg-success',
        'disabled:bg-success/50',
      ]
    },
  },
  compoundVariants: [
    {
      shape: 'solid',
      type: ['primary', 'warning', 'success', 'danger'],
      class: 'text-white'
    },
    {
      shape: 'outline',
      type: 'default',
      class: 'text-default-foreground border-default'
    },
    {
      shape: 'outline',
      type: 'primary',
      class: '!text-primary hover:border-primary/80 active:border-primary hover:text-primary/80 active:text-primary'
    },
    {
      shape: 'outline',
      type: 'warning',
      class: '!text-warning hover:border-warning/80 active:border-warning hover:text-warning/80 active:text-warning'
    },
    {
      shape: 'outline',
      type: 'danger',
      class: '!text-danger hover:border-danger/80 active:border-danger hover:text-danger/80 active:text-danger'
    },
    {
      shape: 'outline',
      type: 'success',
      class: '!text-success hover:border-success/80 active:border-success hover:text-success/80 active:text-success'
    },
  ],
  defaultVariants: {
    shape: 'solid',
    type: 'default'
  }
});
export type ButtonProp = VariantProps<typeof button>;