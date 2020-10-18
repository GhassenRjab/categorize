import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/main.js",
  output: [
    { file: pkg.main, format: "cjs", exports: "default" },
    { file: pkg.module, format: "es" },
    { file: pkg.browser, format: "umd", name: pkg.name },
  ],
  plugins: [babel({ babelHelpers: "bundled" })],
};
