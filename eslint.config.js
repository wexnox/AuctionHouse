export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      eqeqeq: 'error',
      curly: 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-debugger': 'warn',
    },
  },
];