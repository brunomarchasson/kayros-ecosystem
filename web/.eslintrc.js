module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // eslint-configs
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/recommended'],
  // eslint-plugins
  plugins: ['jest', 'react-hooks', 'simple-import-sort', 'react'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    document: false,
    jest: true,
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    curly: ['error', 'multi-line'],
    indent: [
      'error',
      2,
      {
        FunctionDeclaration: {
          body: 1,
          parameters: 2,
        },
        SwitchCase: 2,
      },
    ],
    'import/prefer-default-export': 0,
    'no-extra-semi': 'error',
    semi: ['error', 'always'],
    'semi-spacing': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'max-statements-per-line': ['error', { max: 1 }],
    'max-classes-per-file': 'off',
    'default-param-last': ['error'],
    'react/prop-types': 1,
    camelcase: 'error',
    'no-param-reassign': 0,
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        children: {
          when: 'always',
        },
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'react/no-unescaped-entities': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    'no-new': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-vars': [
      1,
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'max-len': ['error', { code: 120 }],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
