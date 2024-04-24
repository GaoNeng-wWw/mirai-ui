import { cva, VariantProps } from 'cva';

export const inputWrapper = cva({
  base: [
    'relative', 'flex', 'gap-2', 'group', 'p-2', 'cursor-pointer', 'transition'
  ],
  variants: {
    labelPosition:{
      'left': ['flex-row', 'bg-transparent hover:bg-transparent', 'items-center'],
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

  compoundVariants: [
    {
      variant: 'fill',
      error: true,
      class: ['bg-danger-100 hover:bg-danger-200', '*:text-danger-600']
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
    'transition-all', 'z-10', 'origin-top-left', 'text-opacity-100', 'cursor-pointer'
  ],
  variants: {
    labelPosition:{
      'left': [],
      'top': [],
      'top-motion': []
    },
    size: {
      sm: ['text-sm'],
      md: ['text-base'],
      lg: ['text-lg'],
    }
  },
  compoundVariants:[
    {
      labelPosition: 'top-motion',
      class: 'absolute'
    },
    {
      labelPosition: 'top',
      class: ['absolute', 'scale-90', 'text-opacity-90']
    },
    {
      labelPosition: 'top-motion',
      size: 'sm',
      class: [
        'group-data-[focus=true]:text-opacity-90',
        'group-data-[focus=true]:scale-90',
        'group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.base)_/_2)_-_calc(theme(lineHeight[5])_/_2))]'
      ]
    },
    {
      labelPosition: 'top-motion',
      size: 'md',
      class:[
        'group-data-[focus=true]:text-opacity-90',
        'group-data-[focus=true]:scale-90',
        'group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.base)_/_2)_-_calc(theme(lineHeight[6])_/_2))]'
      ]
    },
    {
      labelPosition: 'top-motion',
      size: 'lg',
      class: [
        'group-data-[focus=true]:text-opacity-90',
        'group-data-[focus=true]:scale-90',
        'group-data-[focus=false]:translate-y-[calc(50%_+_calc(theme(fontSize.lg)_/_2)_-_calc(theme(lineHeight[7])_/_2))]'
      ]
    },
    {
      labelPosition: 'left',
      size: 'md',
      class: 'static'
    }
  ]
} as const);

export const inputInnerWrapper = cva({
  base: ['flex', 'w-full', ' items-end', 'cursor-pointer', 'gap-2'],
  variants: {
    labelPosition: {
      'left': ['px-2'],
      'top': [],
      'top-motion': []
    },
    size:{
      sm: ['rounded-sm', 'h-8', 'text-sm', 'leading-none'],
      md: ['rounded', 'h-10', 'text-base', 'leading-none'],
      lg: ['rounded-lg', 'h-12', 'text-lg', 'leading-none'],
    },
    variant: {
      fill: '',
      border: ''
    },
    colors: {
      default: '',
      primary: '',
      danger: '',
      warning: '',
      success: '',
    },
    error: {
      false: '',
      true: '',
    }
  },
  compoundVariants: [
    {
      labelPosition: ['left'],
      variant: 'fill',
      error: true,
      class: ['bg-danger-100 hover:bg-danger-200', '*:text-danger-600']
    },
    {
      labelPosition: ['left'],
      variant: 'fill',
      colors: 'default',
      error: false,
      class: ['bg-default-200 hover:bg-default-300']
    },
    {
      labelPosition: ['left'],
      variant: 'fill',
      colors: 'primary',
      error: false,
      class: ['bg-primary-100 hover:bg-primary-200', '*:text-primary-600']
    },
    {
      labelPosition: ['left'],
      variant: 'fill',
      colors: 'warning',
      error: false,
      class: ['bg-warning-100 hover:bg-warning-200', '*:text-warning-600'],
    },
    {
      labelPosition: ['left'],
      variant: 'fill',
      colors: 'danger',
      class: ['bg-danger-100 hover:bg-danger-200', '*:text-danger-600'],
    },
    {
      labelPosition: ['left'],
      variant: 'fill',
      colors: 'success',
      error: false,
      class: ['bg-success-100 hover:bg-success-200', '*:text-success-600']
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      class: ['border-2'],
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      error: true,
      class: ['border-2', 'border-danger', '*:text-danger-600'],
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      colors: 'default',
      error: false,
      class: ['border-default hover:border-default-400', 'data-[focus=true]:border-default-400']
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      colors: 'primary',
      error: false,
      class: ['border-primary hover:border-primary-400 data-[focus=true]:hover:border-primary-400', '*:text-primary-600']
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      colors: 'warning',
      error: false,
      class: ['border-warning hover:border-warning-400 data-[focus=true]:hover:border-warning-400', '*:text-warning-600'],
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      colors: 'danger',
      class: ['border-danger hover:border-danger-400 data-[focus=true]:hover:border-danger-400', '*:text-danger-600'],
    },
    {
      labelPosition: ['left'],
      variant: 'border',
      colors: 'success',
      error: false,
      class: ['border-success hover:border-success-400 data-[focus=true]:hover:border-success-400', '*:text-success-600']
    },
  ]
});

export const input = cva({
  base: [
    'w-full', 'h-full', 'group-data-[focus=false]:cursor-pointer', 'placeholder:leading-none'
  ],
  variants:{
    labelPosition: {
      'left': [],
      'top': ['!h-auto'],
      'top-motion': ['!h-auto'],
    },
    size: {
      sm: ['placeholder:text-xs'],
      md: ['placeholder:text-sm'],
      lg: ['placeholder:text-base'],
    },
    error: {
      false: [],
      true: ['placeholder:text-danger-600']
    }
  }
});

export const mainWrapper = cva({
  base: ['flex flex-col', 'w-full', 'cursor-pointer'],
  variants: {
    labelPosition: {
      'left': ['items-start'],
      'top': [],
      'top-motion': []
    },
    size:{
      sm: [],
      md: [],
      lg: [],
    }
  },
  compoundVariants: [
    {
      labelPosition: 'top',
      size: 'sm',
      class: 'min-h-8'
    },
    {
      labelPosition: 'top',
      size: 'md',
      class: 'min-h-10'
    },
    {
      labelPosition: 'top',
      size: 'lg',
      class: 'min-h-12'
    },
    {
      labelPosition: 'top-motion',
      size: 'sm',
      class: 'min-h-8'
    },
    {
      labelPosition: 'top-motion',
      size: 'md',
      class: 'min-h-10'
    },
    {
      labelPosition: 'top-motion',
      size: 'lg',
      class: 'min-h-12'
    },
  ]
});

export type InputWrapperProp = VariantProps<typeof inputWrapper>;
export type LabelStyleProp = VariantProps<typeof labelStyle>;
export type InputStyleProp = VariantProps<typeof input>;
export type MainWrapperProp = VariantProps<typeof mainWrapper>;