import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/size',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeLight: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => {
    return {
      components: { Button },
      template: `
        <div class="flex gap-4 flex-wrap items-center">
          <Button size="xs">
            Super Small
          </Button>
          <Button size="sm">
            Small
          </Button>
          <Button size="md">
            Medium
          </Button>
          <Button size="lg">
            Large
          </Button>
          <Button size="xl">
            Super Large
          </Button>
        </div>
      `,
    };
  },
};

export const SizeDark: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => {
    return {
      components: { Button },
      template: `
        <div class="flex gap-4 flex-wrap items-center">
          <Button size="xs">
            Super Small
          </Button>
          <Button size="sm">
            Small
          </Button>
          <Button size="md">
            Medium
          </Button>
          <Button size="lg">
            Large
          </Button>
          <Button size="xl">
            Super Large
          </Button>
        </div>
      `,
    };
  },
};
