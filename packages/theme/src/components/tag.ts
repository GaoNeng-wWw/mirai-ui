import { cva, VariantProps } from 'cva';

export const tag = cva({
  base: ['w-fit', 'flex', 'items-center', 'gap-1'],
  variants:{
    size: {
      sm: 'h-8 rounded p-2 *:text-sm *:leading-none',
      md: '*:text-md h-10 rounded-md p-3 *:leading-none',
      lg: 'h-12 rounded-lg p-4 *:text-lg *:leading-none'
    },
    color: {
      default: ['bg-default', 'text-default-foreground'],
      primary: ['bg-primary-100 dark:bg-primary/20', 'text-primary dark:text-primary-600'],
      warning: ['bg-warning-100 dark:bg-warning/20', 'text-warning dark:text-warning'],
      danger: ['bg-danger-100 dark:bg-danger/20', 'text-danger dark:text-danger'],
    }
  }
});

export type TagProp = VariantProps<typeof tag>;