/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
};
