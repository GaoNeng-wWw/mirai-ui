import type { VariantProps } from 'cva';
import { cva } from 'cva';

export const button = cva({
  base: [
    'group inline-flex outline-none transition-all active:scale-95',
    'disabled:pointer-events-none disabled:border-opacity-50 disabled:text-opacity-50',
    'data-[loading=true]:pointer-events-none data-[loading=true]:border-opacity-50 data-[loading=true]:text-opacity-50',
    'items-center justify-center gap-2'
  ],
  variants: {
    shape:{
      solid: 'border-none disabled:bg-opacity-50 disabled:text-opacity-50 data-[loading=true]:bg-opacity-50 data-[loading=true]:text-opacity-50',
      outline: 'border-2 border-solid !bg-transparent hover:!bg-transparent active:!bg-transparent',
      flat: 'border-none bg-transparent hover:bg-opacity-20 disabled:bg-transparent'
    },
    type: {
      default: '',
      primary: '',
      warning: '',
      danger: '',
      success: ''
    },
    size: {
      sm: 'px-2 h-8  rounded-sm text-sm',
      md: 'px-3 h-10 rounded text-base',
      lg: 'px-6 h-12 rounded-lg text-lg',
    },
    radius: {
      sm: 'rounded-sm',
      md: 'rounded',
      lg: 'rounded-lg'
    },
    iconOnly:{
      true: '!px-0',
    }
  },
  compoundVariants: [
    {
      shape: 'solid',
      type: 'default',
      class: 'bg-default text-default-foreground hover:bg-opacity-80 active:scale-95'
    },
    {
      shape: 'solid',
      type: 'primary',
      class: 'bg-primary text-white hover:bg-opacity-80 active:scale-95'
    },
    {
      shape: 'solid',
      type: 'warning',
      class: 'bg-warning text-white hover:bg-opacity-80 active:scale-95'
    },
    {
      shape: 'solid',
      type: 'danger',
      class: 'bg-danger text-white hover:bg-opacity-80 active:scale-95'
    },
    {
      shape: 'solid',
      type: 'success',
      class: 'bg-success text-white hover:bg-opacity-80 active:scale-95'
    },
    {
      shape: 'outline',
      type: ['default', 'primary', 'warning', 'danger', 'success'],
      class: 'hover:border-opacity-80 hover:text-opacity-80 active:scale-95'
    },
    {
      shape: 'outline',
      type: 'default',
      class: 'border-default text-default-foreground'
    },
    {
      shape: 'outline',
      type: 'primary',
      class: 'border-primary text-primary'
    },
    {
      shape: 'outline',
      type: 'warning',
      class: 'border-warning text-warning'
    },
    {
      shape: 'outline',
      type: 'danger',
      class: 'border-danger text-danger'
    },
    {
      shape: 'outline',
      type: 'success',
      class: 'border-success text-success'
    },
    {
      shape: 'flat',
      type: 'default',
      class: 'text-default-foreground hover:bg-default/40'
    },
    {
      shape: 'flat',
      type: 'primary',
      class: 'text-primary hover:bg-primary/20'
    },
    {
      shape: 'flat',
      type: 'warning',
      class: 'text-warning hover:bg-warning/20'
    },
    {
      shape: 'flat',
      type: 'danger',
      class: 'text-danger hover:bg-danger/20'
    },
    {
      shape: 'flat',
      type: 'success',
      class: 'text-success hover:bg-success/20'
    },
    {
      iconOnly: true,
      size: 'sm',
      class: 'min-w-8 w-8 h-8'
    },
    {
      iconOnly: true,
      size: 'md',
      class: 'min-w-10 w-10 h-10'
    },
    {
      iconOnly: true,
      size: 'lg',
      class: 'min-w-12 w-12 h-12'
    }
  ]
} as const);
export type ButtonProp = VariantProps<typeof button>;