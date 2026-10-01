import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // esbuild drops the "use client" written in the component file, so it goes
  // back in as a banner. tsup's rollup treeshake pass would strip the banner
  // again; esbuild's own bundling still removes dead code.
  banner: { js: '"use client";' },
  treeshake: false,
  external: ["react", "react-dom"],
  tsconfig: "tsconfig.build.json",
});
