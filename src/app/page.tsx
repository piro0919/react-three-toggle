"use client";

import { useState } from "react";
import { ThreeToggle } from "@/components/ThreeToggle";

const THEMES = ["light", "auto", "dark"] as const;
const SIZES = ["S", "M", "L", "XL"] as const;

export default function Home() {
  /* 一番上のトグルがページ自体の見た目を切り替える。説明を読む前に、
     このコンポーネントが何をするものか一度起きる */
  const [theme, setTheme] = useState<string>("auto");
  const [size, setSize] = useState<string>("M");
  const [wrapped, setWrapped] = useState<string>("light");

  return (
    <main className={`stage theme-${theme} size-${size}`}>
      <div className="hero">
        <ThreeToggle
          className="toggle-root hero-toggle"
          indicatorClassName="toggle-indicator"
          onValueChange={setTheme}
          optionClassName="toggle-option"
          value={theme}
          values={[...THEMES]}
        />
        <h1 className="name">react-three-toggle</h1>
        <p className="lead">
          A toggle that cycles through three or more values. The one above is driving this page —
          click it, or focus it and press the arrow keys.
        </p>
        <code className="install">npm i react-three-toggle</code>
      </div>

      <div className="grid">
        <div className="cell">
          <span className="cell-label">uncontrolled</span>
          <ThreeToggle
            className="toggle-root"
            defaultValue="auto"
            indicatorClassName="toggle-indicator"
            optionClassName="toggle-option"
            values={[...THEMES]}
          />
          <p className="cell-note">
            No <code>value</code> prop. It keeps its own state.
          </p>
        </div>

        <div className="cell">
          <span className="cell-label">wrap = false</span>
          <ThreeToggle
            className="toggle-root"
            indicatorClassName="toggle-indicator"
            onValueChange={setWrapped}
            optionClassName="toggle-option"
            value={wrapped}
            values={[...THEMES]}
            wrap={false}
          />
          <p className="cell-note">
            Stops at the last option instead of cycling back. Now: <b>{wrapped}</b>
          </p>
        </div>

        <div className="cell">
          <span className="cell-label">four values</span>
          <ThreeToggle
            className="toggle-root"
            indicatorClassName="toggle-indicator"
            onValueChange={setSize}
            optionClassName="toggle-option"
            value={size}
            values={[...SIZES]}
          />
          <p className="cell-note">
            Three is a name, not a limit. This page&apos;s type scales with it.
          </p>
        </div>
      </div>

      <a
        className="github-link"
        href="https://github.com/piro0919/react-three-toggle"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub →
      </a>
    </main>
  );
}
