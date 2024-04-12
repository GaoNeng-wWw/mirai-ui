import { cva, VariantProps } from 'cva';

export const collapse = cva({
  base: `
    border-default-300
    dark:border-default
    group
    w-full
    border
  `,
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
    'peer', 'flex', 'gap-1', 'w-full', 'text-default-foreground', 'data-[disabled=true]:text-opacity-50', 'data-[disabled=true]:bg-opacity-50',
    '[&_span]:inline-block [&_span]:max-w-full [&_span]:truncate', 'items-center', 'cursor-pointer',
    'data-[disabled=true]:cursor-not-allowed', 'data-[disabled=true]:bg-opacity-50',
    'group-data-[size=sm]:rounded group-data-[size=sm]:p-2 group-data-[size=sm]:text-sm group-data-[size=sm]:leading-none',
    'group-data-[size=md]:text-md group-data-[size=md]:rounded-md group-data-[size=md]:p-3 group-data-[size=md]:leading-none',
    'group-data-[size=lg]:rounded-lg group-data-[size=lg]:p-4 group-data-[size=lg]:text-lg group-data-[size=lg]:leading-none',
    'group-data-[color=default]:bg-default-200 group-data-[color=default]:dark:bg-default-200',
    'group-data-[color=primary]:bg-primary group-data-[color=primary]:text-primary-foreground',
    'group-data-[color=success]:bg-success group-data-[color=success]:text-success-foreground',
    'group-data-[color=warning]:bg-warning group-data-[color=warning]:text-warning-foreground',
    'group-data-[color=danger]:bg-danger group-data-[color=danger]:text-danger-foreground',
    'group-[&>div:not(:first-child):not(:last-child)]:rounded-none',
    // '[&[data-open=true]]:group-[&>div:last-child]:rounded-none',
    // '[&[data-open=false]]:group-[&>div:last-child]:rounded-t-none',
    'group-[&>div:first-child]:rounded-b-none',
    'group-[&>div:last-child]:rounded-t-none',
    'group-[&>div:last-child]:rounded-b-none',
    // 'group-data-[color=default]:bg-default group-data-[color=default]:dark:bg-default-200 group-data-[color=default]:text-default-foreground',
    // 'group-data-[color=danger]:data-[disabled=true]:text-red-500',
    // 'group-data-[color=primary]:bg-primary group-data-[color=primary]:text-primary-foreground',
    // 'group-data-[color=success]:bg-success group-data-[color=success]:text-success-foreground',
    // 'group-data-[color=warning]:bg-warning group-data-[color=warning]:text-warning-foreground',
    // 'group-data-[color=primary]:data-[disabled=true]:text-primary-foreground/50',
    // 'group-data-[color=success]:data-[disabled=true]:text-success-foreground/50',
    // 'group-data-[color=warning]:data-[disabled=true]:text-warning-foreground/50',
    // 'group-data-[color=danger]:bg-danger group-data-[color=danger]:text-danger-foreground group-data-[color=danger]:data-[disabled=true]:text-red-500',
  ],
});

export const collapseBody = cva({
  base: [
    'text-default-foreground',
    'group-data-[size=sm]:p-2 group-data-[size=sm]:pt-1',
    'group-data-[size=md]:p-3 group-data-[size=md]:pt-1',
    'group-data-[size=lg]:p-4 group-data-[size=md]:pt-1',
    'peer-data-[disabled=true]:text-opacity-50'
  ]
});

export type CollapseProp = VariantProps<typeof collapse>;
export type CollapseHeaderProp = VariantProps<typeof collapseHeader>;
export type CollapseBodyProp = VariantProps<typeof collapseBody>;