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
| `defaultValue`       | `string`                          | first option   | Initial value (uncontrolled).                                 |
| `value`              | `string`                          | —              | Controlled value.                                             |
| `onValueChange`      | `(value: string) => void`         | —              | Fired on selection change.                                    |
| `wrap`               | `boolean`                         | `true`         | Wrap from last back to first; set `false` to stop at the end. |
| `orientation`        | `"horizontal" \| "vertical"`      | `"horizontal"` | Layout direction.                                             |
| `name`               | `string`                          | —              | Renders a hidden input for form submission.                   |
| `disabled`           | `boolean`                         | `false`        | Disable interaction.                                          |
| `className`          | `string`                          | —              | Root class.                                                   |
| `indicatorClassName` | `string`                          | —              | Indicator class.                                              |
| `optionClassName`    | `string`                          | —              | Option class.                                                 |

Each option exposes `data-selected="true"` when active. Root exposes `data-three-toggle`, `data-orientation`, `data-disabled`.

## License

MIT
