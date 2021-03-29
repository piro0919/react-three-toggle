# react-three-toggle

react-three-toggle is toggle component for react.

## Features

- TypeScript support
- Supports 3 or more

## Installation

`npm i --save react-three-toggle`

## Example

[react-three-toggle](https://react-three-toggle.kk-web.link/)

## Usage

```tsx
import React from "react";
import ReactThreeToggle from "index";

function App() {
  return <ReactThreeToggle values={["hoge", "fuga", "piyo"]} />;
}

export default App;
```

## Props

### Required

- values

### Optional(default)

- className
- height(16px)
- onChange
- initialValue(values[0])
- isVertical(false)
- isWrap(false)
- style
- width(48px)
