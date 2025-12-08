module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:prettier/recommended',
  ],
  "env": {
    "es6": true
  },
  "rules": {
    "no-var": "error",
    "semi": "error",
    "indent": "error",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "no-use-before-define": "error"
  }
};