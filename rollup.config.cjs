const babel = require("@rollup/plugin-babel");
const pkg = require("./package.json");

module.exports = {
  input: "src/main.js",
  output: [
    { file: pkg.main, format: "cjs", exports: "default" },
    { file: pkg.module, format: "es" },
    { file: pkg.browser, format: "umd", name: pkg.name },
  ],
  plugins: [babel({ babelHelpers: "bundled" })],
};
