import { cva, VariantProps } from 'cva';

/**
 <div>
   <label></label>            <!-- outside label -->
   <div>                      <!-- inner wrapper -->
     <label></label>          <!-- inner label -->
     <div>                    <!-- main component wrapper -->
       <slot name="prefix" /> <!-- prefix slot -->
       <input />              <!-- input -->
       <slot name="suffix" /> <!-- suffix slot -->
     </div>
   </div>
   <div>                      <!--description wrapper -->
     <span></span>            <!-- description content -->
   </div>
 </div>
 */
export const base = cva({
  base: [
    'w-full', 'flex', 'flex-col', 'overflow-hidden', 'group', 'relative', 'p-2'
  ],
  variants: {
    size: {
      sm: ['rounded-sm', '*:text-sm'],
      md: ['rounded-md', '*:text-base'],
      lg: ['rounded-lg', '*:text-lg']
    },
    colors: {
      default: ['bg-default', 'hover:bg-default-200', 'hover:border-default-300'],
      primary: ['bg-primary-100', 'hover:bg-primary-200', 'hover:border-primary-500', '*:text-primary-600'],
      warning: ['bg-warning-100', 'hover:bg-warning-200', 'hover:border-warning-200', '*:text-warning-600'],
      danger:  ['bg-danger-100', 'hover:bg-danger-200', 'hover:border-danger-200', '*:text-danger-600'],
      success: ['bg-success-100', 'hover:bg-success-200', 'hover:border-success-200', '*:text-success-600'],
    },
    labelPosition: {
      'top-outside': 'border-none bg-transparent p-0 hover:bg-transparent',
      'top-inside': 'border-none !bg-transparent p-0 hover:!bg-transparent',
      'left-outside': '!flex-row items-baseline gap-2 border-none bg-transparent p-0 hover:bg-transparent',
    }
  }
});
export const outsideLabel = cva({
  base: [],
  variants: {
    colors: {
      default: ['text-default-foreground'],
      primary: ['text-primary-600'],
      warning: ['text-warning-600'],
      danger: ['text-danger-600'],
      success: ['text-success-600'],
    },
    size: {
      sm: ['text-sm'],
      md: ['text-base'],
      lg: ['text-lg']
    },
    labelPosition: {
      'top-outside': 'origin-top-left scale-90',
      'left-outside': '',
      'top-inside': '',
    },
    error: {
      true: '!text-danger-600',
      fase: ''
    }
  }
});
export const descriptionWrapper = cva({
  base: ['w-full', 'group-data-[invalid=true]:!text-danger-600'],
  variants: {
    color: {
      default: ['text-default-foreground'],
      danger: ['text-danger-600']
    }
  }
});
export const innerWrapper = cva({
  base: ['group', 'relative', 'w-full', 'transition-all'],
  variants: {
    variant: {
      border: ['!bg-transparent', 'hover:!bg-transparent'],
      fill: ['border-none']
    },
    labelPosition: {
      'top-outside': '!bg-transparent hover:!bg-transparent',
      'left-outside': '!bg-transparent hover:!bg-transparent',
      'top-inside': 'p-2',
    },
    colors: {
      default: ['bg-default-200', 'hover:bg-default-300', 'border-default', 'hover:border-default-400'],
      primary: ['bg-primary-100', 'hover:bg-primary-200', 'border-primary', 'hover:border-primary-600', '*:text-primary-600'],
      warning: ['bg-warning-100', 'hover:bg-warning-200', 'border-warning', 'hover:border-warning-600', '*:text-warning-600'],
      danger:  ['bg-danger-100', 'hover:bg-danger-200', 'border-danger', 'hover:border-danger-600', '*:text-danger-600'],
      success: ['bg-success-100', 'hover:bg-success-200', 'border-success', 'hover:border-success-600', '*:text-success-600'],
    },
    size: {
      sm: ['rounded-sm'],
      md: ['rounded'],
      lg: ['rounded-lg'],
    },
  },
  compoundVariants: [
    {
      variant: 'border',
      labelPosition: ['top-inside', 'top-outside'],
      class: 'border'
    }
  ]
});
export const innerLabel = cva({
  base: [
    'absolute',
    'group-data-[focus=true]:-translate-y-1',
    'group-data-[focus=true]:scale-90',
    'translate-x-0',
    'origin-top-left',
    'transition'
  ],
  variants:{
    size: {
      sm: ['text-sm', 'translate-y-[calc(50%_-_theme(fontSize.sm)_+_calc(theme(lineHeight[5])_/_2))]'],
      md: ['text-base', 'translate-y-[calc(50%_-_theme(fontSize.base)_+_calc(theme(lineHeight[6])_/_2))]'],
      lg: ['text-lg', 'translate-y-[calc(50%_-_theme(fontSize.lg)_+_calc(theme(lineHeight[7])_/_2))]']
    },
    colors: {},
    error: {
      true: 'text-danger-600',
      false: ''
    }
  }
});
export const mainComponentWrapper = cva({
  base: [
    'w-full', 'flex', 'transition-all'
  ],
  variants:{
    size: {
      sm: ['rounded-sm', 'h-8'],
      md: ['rounded', 'h-10'],
      lg: ['rounded-lg', 'h-12'],
    },
    labelPosition: {
      'top-inside': ['items-end'],
      'top-outside': ['px-2'],
      'left-outside': ['px-2'],
    },
    colors: {
      default: ['bg-default-200', 'hover:bg-default-300', 'border-default', 'hover:border-default-400'],
      primary: ['bg-primary-100', 'hover:bg-primary-200', 'border-primary', 'hover:border-primary-200', '*:text-primary-600'],
      warning: ['bg-warning-100', 'hover:bg-warning-200', 'border-warning', 'hover:border-warning-400', '*:text-warning-600'],
      danger:  ['bg-danger-100', 'hover:bg-danger-200', 'border-danger', 'hover:border-danger-400', '*:text-danger-600'],
      success: ['bg-success-100', 'hover:bg-success-200', 'border-success', 'hover:border-success-400', '*:text-success-600'],
    },
    error: {
      true: [],
      false: [],
    },
    variant: {
      fill: ['!border-none'],
      border: ['!bg-transparent', 'hover:!bg-transparent']
    }
  },
  compoundVariants: [
    {
      labelPosition: 'left-outside',
      variant: 'border',
      class: ['border']
    },
    {
      labelPosition: 'top-inside',
      error: false,
      class: ['!bg-transparent', 'hover:!bg-transparent']
    },
    {
      error: true,
      variant: 'fill',
      class: ['!bg-danger-100', 'hover:!bg-danger-200',]
    },
    {
      error: true,
      variant: 'border',
      class: ['border-danger-100', 'hover:!border-danger-200', '*:!text-danger-600']
    }
  ]
});
export const input = cva({
  base: ['w-full'],
  variants: {
    error: {
      true: 'text-danger-600',
      false: '',
    }
  }
});
export type Base = VariantProps<typeof base>;
export type OutsideLabel = VariantProps<typeof outsideLabel>;
export type DescriptionWrapper = VariantProps<typeof descriptionWrapper>;
export type InnerWrapper = VariantProps<typeof innerWrapper>;
export type InnerLabel = VariantProps<typeof innerLabel>;
export type MainComponentWrapper = VariantProps<typeof mainComponentWrapper>;
export type Input = VariantProps<typeof input>;