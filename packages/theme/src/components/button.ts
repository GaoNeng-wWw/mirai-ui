import type { VariantProps } from 'cva';
import { cva } from 'cva';

export const button = cva({
  base: 'bg-default-500 group inline-flex border-none',
});

export type ButtonProp = VariantProps<typeof button>;