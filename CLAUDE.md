# CLAUDE.md

## Project Overview

**react-three-toggle** is a multi-value toggle (cycle through 3+ options on click/arrow keys) for React. v1.0.0 is a full rewrite of the legacy 2021 implementation that used @emotion/styled, nanoid, and detect-touch-events.

- **npm package:** react-three-toggle
- **Demo site:** <https://react-three-toggle.kkweb.io>

## Tech Stack

- React 18/19 (peers)
- TypeScript 5
- Next.js 16 (App Router) — demo site only
- tsup — library build (ESM + CJS + .d.ts)
- Vitest + Testing Library + jsdom
- ESLint flat config + Prettier
- Lefthook + Renovate

## Project Structure

```text
src/
├── index.ts
├── components/ThreeToggle/
│   ├── index.ts
│   └── ThreeToggle.tsx       # "use client"
└── app/                      # Next.js demo
    ├── layout.tsx
    ├── page.tsx
    └── globals.css

tests/ThreeToggle.test.tsx
```

## Public API

```tsx
<ThreeToggle
  values={["light", "auto", "dark"]}  // or [{ label, value }]
  defaultValue="auto"                  // uncontrolled
  value={current}                      // controlled
  onValueChange={setCurrent}
  wrap={false}
  orientation="horizontal" | "vertical"
  name="theme"                         // hidden input for forms
  disabled={false}
  className="..."
  indicatorClassName="..."
  optionClassName="..."
/>
```

- Uses `useId` (no nanoid), pointer-agnostic click handling (no detect-touch-events), inline styles + className hooks (no @emotion).
- Accessibility: `role="listbox"`, `aria-orientation`, `aria-activedescendant`, arrow-key navigation.
- Indicator animates via CSS transform translate.

## Publishing Notes

- `files: ["dist", "README.md", "LICENSE"]`.
- v1.0.0 removes @emotion/styled, nanoid, detect-touch-events dependencies. Default export → named `{ ThreeToggle }`. Props renamed (`onChange` → `onValueChange`; class/style objects flattened).
