import { writeFileSync } from "node:fs";
import * as esbuild from "esbuild";

// The web component is for pages without React, so nothing stays external.
// React is swapped for Preact, which runs the same component at a fraction of
// the size. Runs after tsup, which cleans dist first.
await esbuild.build({
  alias: {
    react: "preact/compat",
    "react-dom": "preact/compat",
    "react-dom/client": "preact/compat/client",
    "react/jsx-runtime": "preact/jsx-runtime",
  },
  bundle: true,
  define: { "process.env.NODE_ENV": '"production"' },
  entryPoints: ["src/web-component.tsx"],
  format: "esm",
  jsx: "automatic",
  minify: true,
  outfile: "dist/web-component.js",
  target: "es2020",
});

// The module only registers the element; this is all a consumer can import.
writeFileSync(
  "dist/web-component.d.ts",
  `export declare const ThreeToggleElement: CustomElementConstructor;

declare global {
  interface HTMLElementTagNameMap {
    "three-toggle": HTMLElement;
  }
}
`,
);

console.log("built dist/web-component.js");
