import { tv, VariantProps } from 'tailwind-variants';

export const button = tv({
  base: [
    'z-0', 'inline-flex', 'border-none', 'outline-none items-center justify-center', 'cursor-pointer',
    'transition', 'leading-none', 'active:scale-95', 'min-w-20',
  ],
  variants: {
    disabled: {
      true: ['pointer-events-none', 'opacity-50'],
      false: [''],
    },
    full: {
      true: 'w-full!',
      false: '',
    },
    icon: {
      true: 'aspect-square! min-w-auto p-0!',
    },
    rounded: {
      none: 'rounded-none!',
      xs: 'rounded-xs!',
      sm: 'rounded-sm!',
      md: 'rounded-md!',
      lg: 'rounded-lg!',
      xl: 'rounded-xl!',
      full: 'rounded-full!',
    },
    color: {
      primary: [
        'bg-primary-500', 'border-primary-500', 'hover:bg-primary-400',
        'text-primary-foreground',
      ],
      danger: [
        'bg-danger', 'text-danger-foreground', 'border-danger', 'hover:bg-danger-400',
      ],
      warning: [
        'bg-warning', 'text-warning-foreground', 'border-warning', 'hover:bg-warning-400',
      ],
      success: [
        'bg-success', 'text-success-foreground', 'border-success', 'hover:bg-success-400',
      ],
      secondary: [
        'bg-secondary', 'text-secondary-foreground', 'borde-secondary', 'hover:bg-secondary-400',
      ],
    },
    size: {
      xs: 'px-1.5 h-6 rounded-xs text-xs',
      sm: 'px-3 h-8 rounded-sm text-sm',
      md: 'px-4 h-10 text-base rounded-xl',
      lg: 'px-5 h-12 rounded-lg text-lg',
      xl: 'px-6 h-14 rounded-xl text-xl',
    },
    variant: {
      flat: ['hover:bg-transparent'],
      solid: ['border-transparent', 'border-none'],
      ghost: ['not-hover:bg-transparent'],
      outline: ['border-solid', 'border-2', 'bg-transparent', 'hover:bg-transparent'],
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    variant: 'solid',
  },
  compoundVariants: [
    {
      variant: 'ghost',
      color: 'primary',
      class: 'hover:bg-primary/20 text-primary',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: 'hover:bg-secondary/60 text-secondary-foreground',
    },
    {
      variant: 'ghost',
      color: 'success',
      class: 'hover:bg-success/20 text-success',
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: 'hover:bg-warning/20 text-warning',
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: 'hover:bg-danger/20 text-danger',
    },
    {
      variant: 'flat',
      color: 'primary',
      class: 'bg-primary/20 hover:bg-primary-600/20 text-primary',
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: 'bg-secondary/60 hover:bg-secondary-600/20 text-secondary-foreground',
    },
    {
      variant: 'flat',
      color: 'success',
      class: 'bg-success/20 hover:bg-success-600/20 text-success',
    },
    {
      variant: 'flat',
      color: 'warning',
      class: 'bg-warning/20 hover:bg-warning-600/20 text-warning',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger/20 hover:bg-danger-600/20 text-danger',
    },
    {
      variant: 'outline',
      color: 'primary',
      class: 'border-primary text-primary',
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: 'border-secondary text-secondary-foreground',
    },
    {
      variant: 'outline',
      color: 'success',
      class: 'border-success text-success',
    },
    {
      variant: 'outline',
      color: 'warning',
      class: 'border-warning text-warning',
    },
    {
      variant: 'outline',
      color: 'danger',
      class: 'border-danger text-danger',
    },
  ],
});

export type ButtonThemeProps = VariantProps<typeof button>;
