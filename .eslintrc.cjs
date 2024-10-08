module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'vue'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 1,
    'no-extra-semi': 2,
    'no-regex-spaces': 1,
    'no-unsafe-negation': 2,
    'curly': 2,
    'dot-location': ['error', 'property'],
    'eqeqeq': 2,
    'no-else-return': 2,
    'no-extra-label': 2,
    'no-multi-spaces': 2,
    'no-useless-return': 2,
    'yoda': 2,
    'no-undef-init': 2,
    'lines-around-comment': 2,
    'lines-between-class-members': 2,
    'max-len': ['error', { code: 180, ignoreComments: true }],
    'no-mixed-spaces-and-tabs': 2,
    'no-multiple-empty-lines': 2,
    'space-before-blocks': 2,
    'arrow-body-style': 2,
    'arrow-spacing': 2,
    'no-const-assign': 2,
    'no-var': 2,
    'prefer-const': 2,
    'prefer-arrow-callback': 1,
    'prefer-destructuring': 1,
    'prefer-template': 1,
    'array-bracket-spacing': 2,
    'comma-spacing': ['error', { after: true, before: false }],
    'complexity': 2,
    'no-self-assign': 1,
    'block-spacing': 1,
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'vue/multi-word-component-names': 0,
    'vue/prefer-import-from-vue': 0,
  }
};
