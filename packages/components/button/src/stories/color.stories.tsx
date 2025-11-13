import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/color',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorLight: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center">
      <Button color="secondary">
        Medium
      </Button>
      <Button>
        Medium
      </Button>
      <Button color="warning">
        Medium
      </Button>
      <Button color="success">
        Medium
      </Button>
      <Button color="danger">
        Medium
      </Button>
    </div>
  ),
};

export const ColorDark: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center">
      <Button color="secondary">
        Medium
      </Button>
      <Button>
        Medium
      </Button>
      <Button color="warning">
        Medium
      </Button>
      <Button color="success">
        Medium
      </Button>
      <Button color="danger">
        Medium
      </Button>
    </div>
  ),
};
