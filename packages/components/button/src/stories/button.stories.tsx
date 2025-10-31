import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';


import Button from '../button.vue';

const meta: Meta = {
  title: 'Button',
  component: Button,
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  globals: {
    theme: 'dark',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  render: (args) => {
    return {
      components: { Button },
      template: `
        <div class="dark">
          <Button> hello world </Button>
        </div>
      `,
    };
  },
};

