import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});
export default [
  js.configs.recommended,
  ...compat.extends("airbnb-base"),
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    rules: {
      quotes: ["error", "double"],
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];
