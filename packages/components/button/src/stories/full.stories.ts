import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from '../button.vue';

const meta: Meta = {
  title: 'button/full',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  parameters: {
    theme: 'light',
  },
  render: () => {
    return {
      components: { Button },
      template: `
        <div class="w-[200px] flex flex-col gap-4 flex-wrap p-2">
          <Button full>
            Full
          </Button>
        </div>
      `,
    };
  },
};
