import type { Decorator, Preview } from '@storybook/vue3-vite';
import './style.css';

const preview: Preview = {};

export const withTheme: Decorator = (story, context) => {
  const theme = (context.parameters.theme || context.globals.theme) ?? 'dark';
  return {
    components: { story: story() },
    template: `
      <div class="${theme}">
        <story />
      </div>
      `,
  };
};

export const withPadding: Decorator = (story, context) => {
  return {
    components: { story: story() },
    template: `
      <div class="p-4">
        <story />
      </div>
      `,
  };
};

export const decorators = [
  withPadding,
  withTheme,
];

export default preview;
