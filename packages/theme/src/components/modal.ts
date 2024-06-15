import { cva } from 'cva';

export const ModalHeader = cva({
  base: 'flex w-full gap-2 px-4 pb-0 pt-4 text-xl leading-none',
});

export const ModalContent = cva({
  base: 'w-full break-words px-4 pt-4 text-base',
});

export const ModalFooter = cva({
  base: 'flex w-full justify-end gap-2 p-4'
});

export const Modal = cva({
  base: 'bg-content1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 modal transform-gpu origin-top-left',
  variants: {
    rounded:{
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded',
      lg: 'rounded-lg'
    }
  }
});