import { tw } from '../theme/src/';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.storybook/welcome.mdx',
    '../components/**/*.{js,ts,tsx,jsx,vue}',
    '../theme/src/components/**/*.{ts}',
  ],
  plugins:[
    tw(),
  ]
};
