import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === "production",
  bundle: true,
  splitting: false,
});
