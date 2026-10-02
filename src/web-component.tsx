import r2wc from "@r2wc/react-to-web-component";
import { ThreeToggle } from "./components/ThreeToggle";

// Built by scripts/build-web-component.mjs into a single file that carries its
// own runtime: `react` is aliased to Preact there, so pages without React can
// load it with one script tag. `onValueChange` becomes a `valuechange` event
// carrying the new value in `detail`.
const ThreeToggleElement = r2wc(ThreeToggle, {
  events: ["onValueChange"],
  props: {
    "aria-label": "string",
    "aria-labelledby": "string",
    className: "string",
    defaultValue: "string",
    disabled: "boolean",
    indicatorClassName: "string",
    name: "string",
    optionClassName: "string",
    orientation: "string",
    value: "string",
    values: "json",
    wrap: "boolean",
  },
});

// A page that loads the script twice would otherwise throw on the second
// `define`.
if (!customElements.get("three-toggle")) {
  customElements.define("three-toggle", ThreeToggleElement);
}

export { ThreeToggleElement };
