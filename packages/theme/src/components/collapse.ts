import { tv } from 'tailwind-variants';

export const collapse = tv({
  slots: {
    base: 'rounded-md overflow-hidden border border-solid border-DEFAULT-500/50 text-base',
    item: 'w-full',
    header: [
      'w-full cursor-pointer bg-DEFAULT-100 font-medium text-base border-b border-solid border-DEFAULT-500/50 flex gap-2 text-DEFAULT-foreground',
      'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-opacity-30 data-[disabled=true]:text-DEFAULT-foreground/50'
    ],
    content: 'w-full overflow-hidden',
  },
  variants: {
    size: {
      sm: {
        header: 'px-sm py-xs text-sm',
        content: 'text-sm p-sm',
      },
      md: {
        header: 'px-md py-sm',
        content: 'p-md text-base',
      },
      lg: {
        header: 'px-lg py-md',
        content: 'px-lg py-md text-base',
      },
    },
  },
});
