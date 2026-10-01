# Changelog

## 2.0.0 - 2026-10-01

- **BREAKING:** the root is now a `<div role="radiogroup">` and each option a
  `role="radio"` with `aria-checked`, replacing the invalid
  `<button role="listbox">` with `role="option"` children.
  - Focus moves to the checked option (roving tabindex) instead of the root.
    A `:focus-visible` rule on the root no longer matches; use
    `[data-three-toggle]:has(:focus-visible)`.
  - The root no longer gets the browser's default `<button>` styles: no UA
    padding, border, background or system font. Labels now inherit the page
    font. Styles set through `className` / `style` are unaffected.
  - Tests or selectors that queried `role="listbox"`, `role="option"` or
    `aria-selected` need to use `radiogroup`, `radio` and `aria-checked`.
- Keyboard: all four arrow keys move and select regardless of orientation, and
  Home / End jump to the first and last option. A pointer click anywhere still
  cycles; a click from assistive technology selects the option it names.
- New `aria-label` and `aria-labelledby` props name the group.
- The uncontrolled selection is stored by value, so reordering `values` keeps it.
- In development, a `value` / `defaultValue` that is not in `values`, and
  duplicate `values`, log a warning. Both still fall back to the first option.
- `dist` keeps `"use client"`, so the component works when imported from a
  Server Component without a wrapper.
- `require` gets its own `index.d.cts` type declarations, and `./package.json`
  is exported. `engines` drops from `>=20.20.2` to `>=18`.
- CI runs publint and attw (`pnpm check:package`), the full job on Node 22 and
  24, a smoke import of the packed tarball on Node 18 and 20, and the tests
  against React 18 and the latest React.
