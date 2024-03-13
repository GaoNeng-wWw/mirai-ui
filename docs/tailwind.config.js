const {miraiUiPlugin} = require('@mirai-ui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{js,ts,tsx,vue,md}',
    './**/*.vue',
    './**/*.md',
    './node_modules/@mirai-ui/**/*.{js,ts,tsx,vue,md}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    miraiUiPlugin(),
    require('@tailwindcss/typography')
  ],
}

