import ts from "typescript";
import path from "path";
import external from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import { safePackageName } from "./safePackageName";
import { pascalcase } from "./pascalcase";
import pkg from "../package.json";
import postcss from "rollup-plugin-postcss";

export function createRollupConfig(options, callback) {
  const name = options.name || safePackageName(pkg.name);
  const umdName = options.umdName || pascalcase(safePackageName(pkg.name));
  const shouldMinify = options.minify || options.env === "production";
  const tsconfigPath = options.tsconfig || "tsconfig.json";
  const tsconfigJSON = ts.readConfigFile(tsconfigPath, ts.sys.readFile).config;
  const tsCompilerOptions = ts.parseJsonConfigFileContent(
    tsconfigJSON,
    ts.sys,
    "./"
  ).options;

  const outputName = [
    path.join(tsCompilerOptions.outDir, name),
    typeof options.formatName === "string"
      ? options.formatName
      : options.format,
    // options.env,
    // shouldMinify ? "min" : "",
    "js",
  ]
    .filter(Boolean)
    .join(".");

  const config = {
    // preserveModules: true,
    input: options.input,
    output: {
      // dir: "dist",
      file: outputName,
      format: options.format,
      name: umdName,
      sourcemap: true,
      globals: { react: "React" },
      exports: "named",
    },
    plugins: [
      resolve({ rootDir: "../../" }),
      external(),
      typescript({
        tsconfig: options.tsconfig,
        clean: true,
      }),
      postcss({
        extract: false,
        modules: true,
      }),
      commonjs(),
      options.env !== undefined &&
        replace({
          "process.env.NODE_ENV": JSON.stringify(options.env),
        }),
      sourcemaps(),
      shouldMinify &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}
