import { cva, VariantProps } from 'cva';

export const inputWrapper = cva({
  base: [
    'relative', 'flex', 'gap-1', 'group', 'p-2', 'cursor-pointer', 'transition'
  ],
  variants: {
    labelPosition:{
      'left-motion': ['flex-row'],
      'left': ['flex-row'],
      'top': 'flex-col',
      'top-motion': 'flex-col'
    },
    size: {
      sm: ['rounded-sm'],
      md: ['rounded-md'],
      lg: ['rounded-lg'],
    },
    colors:{
      default: [],
      primary: [],
      warning: [],
      danger: [],
      success: []
    },
    variant:{
      fill: [],
      border: [],
    },
    error: {
      true: [],
      false: []
    }
  },

  compoundVariants:[
    {
      variant: 'fill',
      error: true,
      class: ['bg-danger-100 hover:bg-danger-200', 'text-danger']
    },
    {
      variant: 'fill',
      colors: 'default',
      error: false,
      class: ['bg-default-200 hover:bg-default-300']
    },
    {
      variant: 'fill',
      colors: 'primary',
      error: false,
      class: ['bg-primary-100 hover:bg-primary-200', '*:text-primary-600']
    },
    {
      variant: 'fill',
      colors: 'warning',
      error: false,
      class: ['bg-warning-100 hover:bg-warning-200', '*:text-warning-600'],
    },
    {
      variant: 'fill',
      colors: 'danger',
      class: ['bg-danger-100 hover:bg-danger-200', '*:text-danger-600'],
    },
    {
      variant: 'fill',
      colors: 'success',
      error: false,
      class: ['bg-success-100 hover:bg-success-200', '*:text-success-600']
    },
    {
      variant: 'border',
      class: ['border-2'],
    },
    {
      variant: 'border',
      error: true,
      class: ['border-2', 'border-danger', '*:text-danger-600'],
    },
    {
      variant: 'border',
      colors: 'default',
      error: false,
      class: ['border-default hover:border-default-400', 'data-[focus=true]:border-default-400']
    },
    {
      variant: 'border',
      colors: 'primary',
      error: false,
      class: ['border-primary hover:border-primary-400 data-[focus=true]:hover:border-primary-400', '*:text-primary-600']
    },
    {
      variant: 'border',
      colors: 'warning',
      error: false,
      class: ['border-warning hover:border-warning-400 data-[focus=true]:hover:border-warning-400', '*:text-warning-600'],
    },
    {
      variant: 'border',
      colors: 'danger',
      class: ['border-danger hover:border-danger-400 data-[focus=true]:hover:border-danger-400', '*:text-danger-600'],
    },
    {
      variant: 'border',
      colors: 'success',
      error: false,
      class: ['border-success hover:border-success-400 data-[focus=true]:hover:border-success-400', '*:text-success-600']
    },
  ]
});
export const labelStyle = cva({
  base: [
    'transition-all', 'absolute', 'z-10', 'origin-top-left', 'text-opacity-100', 'group-data-[focus=true]:text-opacity-90', 'group-data-[focus=true]:scale-90', 'cursor-pointer'
  ],
  variants: {
    labelPosition:{
      'left-motion': [],
      'left': [],
      'top': [],
      'top-motion': []
    },
    size: {
      sm: ['group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.base)_/_2)_-_calc(theme(lineHeight[5])_/_2))]', 'text-sm'],
      md: ['group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.base)_/_2)_-_calc(theme(lineHeight[6])_/_2))]', 'text-base'],
      lg: ['group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.lg)_/_2)_-_calc(theme(lineHeight[7])_/_2))]', 'text-lg'],
    }
  },
} as const);

export const inputInnerWrapper = cva({
  base: ['flex', 'w-full', 'h-full', ' items-end', 'cursor-pointer'],
  variants: {
    labelPosition: {
      'left-motion': [],
      'left': [],
      'top': [],
      'top-motion': []
    },
    size:{
      sm: ['rounded-sm', 'h-8', 'min-h-8', 'text-sm', 'leading-none'],
      md: ['rounded', 'h-10', 'min-h-10', 'text-base', 'leading-none'],
      lg: ['rounded-lg', 'h-12', 'min-h-12', 'text-lg', 'leading-none'],
    }
  }
});

export const input = cva({
  base: [
    'w-full', 'h-full', 'group-data-[focus=false]:cursor-pointer'
  ],
  variants:{
    labelPosition: {
      'left-motion': [],
      'left': [],
      'top': [],
      'top-motion': [],
    },
    size: {
      sm: [],
      md: [],
      lg: [],
    },
  }
});

export type InputWrapperProp = VariantProps<typeof inputWrapper>;
export type LabelStyleProp = VariantProps<typeof labelStyle>;
export type InputStyleProp = VariantProps<typeof input>;