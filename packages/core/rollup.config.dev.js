import { createRollupConfig } from "../../rollup/createRollupConfig";
import pkg from "./package.json";

const name = "index";
const options = [
  { name, format: "esm", env: "development", input: pkg.source },
];

export default options.map((option) => createRollupConfig(option));
