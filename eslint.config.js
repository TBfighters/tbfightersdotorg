const html = require("@html-eslint/eslint-plugin");
const parser = require("@html-eslint/parser");

module.exports = [
  // recommended configuration included in the plugin
  html.configs["flat/recommended"],
  // your own configurations.
  {
    files: ["**/*.html"],
    plugins: {
      "@html-eslint": html,
    },
    languageOptions: {
      parser,
    },
    rules: {
      "@html-eslint/indent": ["warn", "tab"],
      "@html-eslint/element-newline": "warn",
      "@html-eslint/no-extra-spacing-attrs": ["warn", {"enforceBeforeSelfClose": true}],
      "@html-eslint/require-closing-tags": ["error",{ "selfClosing": "always" }],
      "@html-eslint/element-newline": "off",
    },
  },
];