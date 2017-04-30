module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['import', 'redux-saga', 'react', 'jsx-a11y'],
  globals: {
    NODE_ENV: true,
    describe: true,
    it: true,
    expect: true,
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'import/external-module-folders': ['node_modules'],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/first': 2,
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
    //     'newlines-between': 'always',
    //   },
    // ],
    'react/jsx-filename-extension': 0,
    'react/require-extension': 0,
    'react/no-unescaped-entities': 0,
    'linebreak-style': 0, //['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': 'error',
    'max-len': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0, // let prettier deal with that ish
    'arrow-parens': 0,
    'eol-last': 0,
  },
};
