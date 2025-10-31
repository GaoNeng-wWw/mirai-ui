import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'z-0', 'inline-flex', 'border-none', 'outline-none items-center justify-center', 'cursor-pointer',
  ],
  variants: {
    color: {
      primary: [
        'bg-mirai-ui-primary', 'border-mirai-ui-primary', 'hover:bg-mirai-ui-primary-400',
      ],
      danger: [
        'bg-mirai-ui-danger', 'border-mirai-ui-danger', 'hover:bg-mirai-ui-danger-400',
      ],
      warning: [
        'bg-mirai-ui-warning', 'border-mirai-ui-warning', 'hover:bg-mirai-ui-warning-400',
      ],
      success: [
        'bg-mirai-ui-success', 'border-mirai-ui-success', 'hover:bg-mirai-ui-success-400',
      ],
      secondary: [
        'bg-mirai-ui-secondary', 'border-mirai-ui-secondary', 'hover:bg-mirai-ui-secondary-400',
      ],
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});
