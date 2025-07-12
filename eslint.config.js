const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
    ignores: ['dist/*'],
    settings: {
      'import/resolver': {
        'babel-module': {
          root: ['./'],
          alias: {
            '@': './src',
            '@env': './.env'
          },
        },
      },
    },
  },
]);