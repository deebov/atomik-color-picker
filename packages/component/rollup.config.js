import { createRollupConfig } from "../../rollup/createRollupConfig";
import pkg from "./package.json";

const name = "index";
const options = [
  {
    name,
    format: "cjs",
    formatName: "",
    env: "production",
    input: pkg.source,
  },
  { name, format: "esm", env: "production", input: pkg.source },
];

export default options.map((option) => createRollupConfig(option));
