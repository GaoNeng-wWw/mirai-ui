import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/disabled',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DisabledLight: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center">
      <Button color="secondary" disabled>
        Medium
      </Button>
      <Button disabled>
        Medium
      </Button>
      <Button color="warning" disabled>
        Medium
      </Button>
      <Button color="success" disabled>
        Medium
      </Button>
      <Button color="danger" disabled>
        Medium
      </Button>
    </div>
  ),
};

export const DisabledDark: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center">
      <Button color="secondary" disabled>
        Medium
      </Button>
      <Button disabled>
        Medium
      </Button>
      <Button color="warning" disabled>
        Medium
      </Button>
      <Button color="success" disabled>
        Medium
      </Button>
      <Button color="danger" disabled>
        Medium
      </Button>
    </div>
  ),
};
