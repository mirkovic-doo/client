module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte', '.ts'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': 'error',
    'no-else-return': 'error',
    'no-unused-expressions': 'error',
    'no-undef': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    'no-floating-decimal': 'error',
    'no-extra-parens': ['error', 'all', { nestedBinaryExpressions: false }],
    'no-extra-semi': 'error',
    'no-nested-ternary': 'error',
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
};
