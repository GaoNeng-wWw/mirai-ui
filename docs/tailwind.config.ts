import { tw } from './node_modules/@miraiui-org/theme/src';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{js,ts,tsx,vue,md}',
    './**/*.vue',
    './**/*.md',
    './node_modules/@miraiui-org/**/*.{js,ts,tsx,vue,md}',
  ],
  plugins: [
    tw(),
  ],
};
