import { miraiUiPlugin } from '@miraiui-org/theme';
import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './.vitepress/**/*.{js,ts,tsx,vue,md}',
    './**/*.vue',
    './**/*.md',
    './node_modules/@miraiui-org/**/*.{js,ts,tsx,vue,md}'
  ],
  theme: {
  },
  plugins: [
    miraiUiPlugin(),
    require('@tailwindcss/typography')
  ],
  darkMode: 'class',
};
module.exports = config;