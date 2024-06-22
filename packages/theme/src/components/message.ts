import { cva, VariantProps } from 'cva';

export const message = cva({
  base: 'fixed left-1/2 top-0 z-50 flex w-fit -translate-x-1/2 items-center gap-1 rounded-md border px-4 py-2 text-sm leading-none',
  variants:{
    type: {
      info: 'bg-default-200 border-default-300 text-default-800',
      primary: 'bg-primary-100 border-primary-200 text-primary-800',
      warning: 'bg-warning-100 border-warning-200 text-warning-800',
      danger: 'bg-danger-100 border-danger-200 text-danger dark:text-danger-800',
      success: 'bg-success-100 border-success-200 text-success-800',
    }
  }
});

export const closeIcon = cva({
  base: 'size-[1.125rem] cursor-pointer'
});

export type Mesasge = VariantProps<typeof message>;