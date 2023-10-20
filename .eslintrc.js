module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        semi: true,
      },
    ],
  },
};