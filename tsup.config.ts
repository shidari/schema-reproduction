import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts"],
  noExternal:["zod"],
  outDir:"dist",
  splitting: false,
  sourcemap: true,
  clean: true,
  format:"esm",
  target:"es2022"
});