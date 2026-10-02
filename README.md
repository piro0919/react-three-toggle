# react-three-toggle

> Multi-value toggle component for React. Cycle through three or more options on click.

[![npm](https://img.shields.io/npm/v/react-three-toggle.svg)](https://www.npmjs.com/package/react-three-toggle)
[![license](https://img.shields.io/npm/l/react-three-toggle.svg)](./LICENSE)

A small, dependency-free toggle that cycles through 3+ options with a sliding indicator. Click or use arrow keys. Supports controlled / uncontrolled modes, wrap-around, horizontal / vertical orientation, and form integration via a hidden input.

🌐 **Demo:** <https://react-three-toggle.kkweb.io>

## Install

```bash
npm install react-three-toggle
```

Requires React 18 or 19.

## Usage

```tsx
import { ThreeToggle } from "react-three-toggle";

export function App() {
  return (
    <ThreeToggle
      values={["light", "auto", "dark"]}
      defaultValue="auto"
      onValueChange={(v) => console.log(v)}
    />
  );
}
```

Rich labels:

```tsx
<ThreeToggle
  values={[
    { label: "🌞 Light", value: "light" },
    { label: "🤖 Auto", value: "auto" },
    { label: "🌙 Dark", value: "dark" },
  ]}
/>
```

## API

| Prop                 | Type                              | Default        | Description                                                   |
| -------------------- | --------------------------------- | -------------- | ------------------------------------------------------------- |
| `values`             | `string[] \| { label?, value }[]` | —              | Options. At least one required.                               |
| `defaultValue`       | `string`                          | first option   | Initial value (uncontrolled). Must be one of `values`.        |
| `value`              | `string`                          | —              | Controlled value. Must be one of `values`.                    |
| `onValueChange`      | `(value: string) => void`         | —              | Fired on selection change.                                    |
| `wrap`               | `boolean`                         | `true`         | Wrap from last back to first; set `false` to stop at the end. |
| `orientation`        | `"horizontal" \| "vertical"`      | `"horizontal"` | Layout direction.                                             |
| `name`               | `string`                          | —              | Renders a hidden input for form submission.                   |
| `disabled`           | `boolean`                         | `false`        | Disable interaction.                                          |
| `className`          | `string`                          | —              | Root class.                                                   |
| `indicatorClassName` | `string`                          | —              | Indicator class.                                              |
| `optionClassName`    | `string`                          | —              | Option class.                                                 |
| `aria-label`         | `string`                          | —              | Accessible name of the group.                                 |
| `aria-labelledby`    | `string`                          | —              | Id of the element that names the group.                       |

Each option exposes `data-selected="true"` when active. Root exposes `data-three-toggle`, `data-orientation`, `data-disabled`.

Values must be unique. A `value` or `defaultValue` that is not in `values`
falls back to the first option; in development both mistakes log a warning.
The uncontrolled selection is kept by value, so reordering `values` does not
change what is selected.

## Accessibility

The root is a `role="radiogroup"` `<div>` and each option is a `role="radio"`
with `aria-checked`, following the WAI-ARIA radio group pattern.

- **Tab** lands on the checked option — the group is a single tab stop.
- **Arrow keys** (all four, whatever the orientation) move to the previous or
  next option and select it, honouring `wrap`. **Home** / **End** jump to the
  first and last.
- **Click** anywhere still cycles to the next option. A click from assistive
  technology (one without a pointer behind it) selects the option it names.
- Give the group a name with `aria-label` or `aria-labelledby`.

Focus sits on an option, not on the root, so draw a focus ring on the root with
`:has()`:

```css
[data-three-toggle]:has(:focus-visible) {
  outline: 2px solid;
}
```

## Web Component

For pages without React, the package also ships a `<three-toggle>` custom
element. It is the same component running on Preact, so it needs nothing else:
about 12 kB gzipped.

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/react-three-toggle/dist/web-component.js"
></script>

<three-toggle
  values='["light", "auto", "dark"]'
  default-value="auto"
  name="theme"
  aria-label="Theme"
  class-name="toggle"
  indicator-class-name="toggle-indicator"
></three-toggle>
```

With a bundler, import it once instead of the script tag:

```js
import "react-three-toggle/web-component";
```

Props become attributes in kebab-case. `values` takes JSON, either strings or
`{ "value", "label" }` objects with a string label. Booleans take `"true"` or
`"false"` (an empty attribute such as a bare `disabled` is ignored). Everything
can also be set as a property from JavaScript. `style` is not available; style
the element or use the class name attributes.

`onValueChange` is dispatched as a `valuechange` event with the new value in
`detail`:

```js
document.querySelector("three-toggle").addEventListener("valuechange", (event) => {
  console.log(event.detail);
});
```

With `name`, the hidden input sits inside the element, so a surrounding
`<form>` submits it like any other field.

## License

MIT
