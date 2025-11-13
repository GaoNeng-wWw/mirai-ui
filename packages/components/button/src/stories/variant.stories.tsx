import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/variant',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantLight: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => (
    (
      <div class="flex flex-col gap-4 flex-wrap">
        <div class="space-x-4">
          <Button color="secondary">
            Solid
          </Button>
          <Button>
            Solid
          </Button>
          <Button color="warning">
            Solid
          </Button>
          <Button color="success">
            Solid
          </Button>
          <Button color="danger">
            Solid
          </Button>
        </div>
        <div class="space-x-4">
          <Button color="secondary" variant="ghost">
            Ghost
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
          <Button color="warning" variant="ghost">
            Ghost
          </Button>
          <Button color="success" variant="ghost">
            Ghost
          </Button>
          <Button color="danger" variant="ghost">
            Ghost
          </Button>
        </div>
        <div class="space-x-4">
          <Button color="secondary" variant="flat">
            Flat
          </Button>
          <Button variant="flat">
            Flat
          </Button>
          <Button color="warning" variant="flat">
            Flat
          </Button>
          <Button color="success" variant="flat">
            Flat
          </Button>
          <Button color="danger" variant="flat">
            Flat
          </Button>
        </div>
        <div class="space-x-4">
          <Button color="secondary" variant="outline">
            Outline
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button color="warning" variant="outline">
            Outline
          </Button>
          <Button color="success" variant="outline">
            Outline
          </Button>
          <Button color="danger" variant="outline">
            Outline
          </Button>
        </div>
      </div>
    )
  ),
};

export const VariantDark: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => (
    <div class="flex flex-col gap-4 flex-wrap">
      <div class="space-x-4">
        <Button color="secondary">
          Solid
        </Button>
        <Button>
          Solid
        </Button>
        <Button color="warning">
          Solid
        </Button>
        <Button color="success">
          Solid
        </Button>
        <Button color="danger">
          Solid
        </Button>
      </div>
      <div class="space-x-4">
        <Button color="secondary" variant="ghost">
          Ghost
        </Button>
        <Button variant="ghost">
          Ghost
        </Button>
        <Button color="warning" variant="ghost">
          Ghost
        </Button>
        <Button color="success" variant="ghost">
          Ghost
        </Button>
        <Button color="danger" variant="ghost">
          Ghost
        </Button>
      </div>
      <div class="space-x-4">
        <Button color="secondary" variant="flat">
          Flat
        </Button>
        <Button variant="flat">
          Flat
        </Button>
        <Button color="warning" variant="flat">
          Flat
        </Button>
        <Button color="success" variant="flat">
          Flat
        </Button>
        <Button color="danger" variant="flat">
          Flat
        </Button>
      </div>
      <div class="space-x-4">
        <Button color="secondary" variant="outline">
          Outline
        </Button>
        <Button variant="outline">
          Outline
        </Button>
        <Button color="warning" variant="outline">
          Outline
        </Button>
        <Button color="success" variant="outline">
          Outline
        </Button>
        <Button color="danger" variant="outline">
          Outline
        </Button>
      </div>
    </div>
  ),
};
