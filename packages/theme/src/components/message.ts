import { cva, VariantProps } from 'cva';

export const message = cva({
  base: 'fixed left-1/2 top-0 z-50 w-fit -translate-x-1/2 rounded-md border px-4 py-2',
  variants:{
    type: {
      info: 'bg-default-200 border-default-300 text-default-800',
      blue: 'bg-primary-100 border-primary-200 text-primary-600',
    }
  }
});

export type Mesasge = VariantProps<typeof message>;