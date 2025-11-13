import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/rounded',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RoundedLight: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center py-4">
      <Button color="secondary" rounded="none">
        none
      </Button>
      <Button color="secondary" rounded="xs">
        xs
      </Button>
      <Button color="secondary" rounded="sm">
        sm
      </Button>
      <Button color="secondary" rounded="md">
        md
      </Button>
      <Button color="secondary" rounded="lg">
        lg
      </Button>
      <Button color="secondary" rounded="xl">
        xl
      </Button>
      <Button color="secondary" rounded="full">
        Full
      </Button>
    </div>
  ),
};

export const RoundedDark: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => (
    <div class="flex gap-4 flex-wrap items-center py-4">
      <Button color="secondary" rounded="none">
        none
      </Button>
      <Button color="secondary" rounded="xs">
        xs
      </Button>
      <Button color="secondary" rounded="sm">
        sm
      </Button>
      <Button color="secondary" rounded="md">
        md
      </Button>
      <Button color="secondary" rounded="lg">
        lg
      </Button>
      <Button color="secondary" rounded="xl">
        xl
      </Button>
      <Button color="secondary" rounded="full">
        Full
      </Button>
    </div>
  ),
};
