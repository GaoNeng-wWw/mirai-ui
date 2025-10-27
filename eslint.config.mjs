// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from 'eslint-plugin-storybook';

import { www } from '@gaonengwww/eslint-config';

export default www({
  typescript: true,
  vue: true,
  type: 'lib',
  // settings: {
  //   ...storybook.configs,
  // },
  overrides: {
    typescript: {
      'ts/explicit-function-return-type': ['off'],
    },
  },
});
