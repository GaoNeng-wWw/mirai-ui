import { cva, VariantProps } from 'cva';

export const checkIcon = cva({
  base: [
    'transition-[transform_theme("duration.slow")_ease,stroke-dashoffset_theme("duration.slow")_ease_150ms] duration-slow ease-quint origin-center',
    'data-[visible=true]:[stroke-dashoffset:0] data-[visible=true]:scale-100',
    'data-[visible=false]:[stroke-dashoffset:200] data-[visible=false]:scale-0',
  ],
  variants: {
    variant: {
      info: 'text-default-foreground',
      primary: 'text-primary-foreground',
      warning: 'text-warning-foreground',
      danger: 'text-danger-foreground',
    }
  }
});

export const checkboxWrapper = cva({
  base: [
    'text-default-foreground cursor-pointer inline-flex items-center gap-2 group',
    'data-[disabled=true]:text-opacity-50 data-[disabled=true]:cursor-default',
    'data-[disabled=true]:pointer-events-none'
  ],
  variants: {
    indeterminate: {
      true: '',
      false: ''
    }
  }
} as const);

export const checkbox = cva({
  base: [
    'rounded w-6 h-6 inline-block p-1 box-border border-2 border-default',
    'group-data-[disabled=true]:bg-opacity-50 group-data-[disabled=true]:border-opacity-50 group-data-[disabled=true]:cursor-default',
    'transition group-hover:bg-opacity-50 group-hover:border-opacity-50'
  ],
  variants: {
    indeterminate: {
      true: '',
      false: ''
    },
    variant: {
      info: [
        'group-data-[checked=true]:bg-default group-data-[checked=true]:border-default group-hover:bg-default'
      ],
      primary: [
        'group-hover:border-primary group-data-[checked=true]:border-primary group-hover:bg-primary group-data-[checked=true]:bg-primary'
      ],
      warning: [
        'group-hover:border-warning group-data-[checked=true]:border-warning group-hover:bg-warning group-data-[checked=true]:bg-warning'
      ],
      danger: [
        'group-hover:border-danger group-data-[checked=true]:border-danger group-hover:bg-danger group-data-[checked=true]:bg-danger'
      ],
    }
  }
} as const);

export type CheckboxWrapperType = VariantProps<typeof checkboxWrapper>;
export type CheckboxType = VariantProps<typeof checkbox>;
export type CheckIconType = VariantProps<typeof checkIcon>;