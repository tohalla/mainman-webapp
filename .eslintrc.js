module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "prettier",
    "import",
    "@emotion",
  ],
  rules: {
    "react/jsx-curly-newline": "off",
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens",
        assignment: "parens",
        return: "parens",
        arrow: "parens",
        condition: "ignore",
        logical: "ignore",
        prop: "ignore",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/no-unresolved": [2, { caseSensitive: false }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draft"] },
    ],
    "react/jsx-sort-props": "error",
    "no-use-before-define": "off",
    "sort-vars": "error",
    "react/self-closing-comp": "error",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    // NOTE: https://github.com/vercel/next.js/issues/5533
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "import/prefer-default-export": "off",
    "no-void": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.spec.tsx", "**/*.spec.ts"] },
    ],
    "no-nested-ternary": "off",
    "react-hooks/exhaustive-deps": "off",
    // NOTE: disabled due to performance issues
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/display-name": "off",
    "react/default-props-match-prop-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "consistent-return": "off",
    "react/style-prop-object": [
      true,
      {
        allow: ["FormattedPrice"],
      },
    ],
  },
};
