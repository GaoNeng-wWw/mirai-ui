import { cva, VariantProps } from 'cva';

export const collapse = cva({
  base: 'border-default group w-full border',
  variants: {
    size: {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg'
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    },
  }
});

export const collapseHeader = cva({
  base: [
    'flex', 'gap-1', 'w-full', '[&_span]:inline-block [&_span]:max-w-full [&_span]:truncate', 'items-center',
    'group-data-[size=sm]:rounded-t group-data-[size=sm]:p-2 group-data-[size=sm]:text-sm group-data-[size=sm]:leading-none',
    'group-data-[size=md]:text-md group-data-[size=md]:rounded-t-md group-data-[size=md]:p-3 group-data-[size=md]:leading-none',
    'group-data-[size=lg]:rounded-t-lg group-data-[size=lg]:p-4 group-data-[size=lg]:text-lg group-data-[size=lg]:leading-none',
    'group-data-[color=default]:bg-default group-data-[color=default]:dark:bg-default-200 group-data-[color=default]:text-default-foreground',
    'group-data-[color=primary]:bg-primary group-data-[color=primary]:text-primary-foreground',
    'group-data-[color=success]:bg-success group-data-[color=success]:text-success-foreground',
    'group-data-[color=warning]:bg-warning group-data-[color=warning]:text-warning-foreground',
    'group-data-[color=danger]:bg-danger group-data-[color=danger]:text-danger-foreground',
  ],
});


export type CollapseProp = VariantProps<typeof collapse>;
export type CollapseHeaderProp = VariantProps<typeof collapseHeader>;