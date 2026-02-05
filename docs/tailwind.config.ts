import path from 'path';
import { tw } from '../packages/theme/src/';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{js,ts,tsx,vue,md}',
    './node_modules/@miraiui-org/**/*',
  ],
  plugins: [
    tw(),
    typography(),
  ],
  darkMode: 'class',
};
