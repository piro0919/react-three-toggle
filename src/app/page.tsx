"use client";

import { useState } from "react";
import { ThreeToggle } from "@/components/ThreeToggle";

export default function Home() {
  const [light, setLight] = useState("auto");
  const [size, setSize] = useState("M");

  return (
    <div className="container">
      <h1 className="title">react-three-toggle</h1>
      <p className="subtitle">
        Multi-value toggle component for React. Click or press arrow keys to cycle through options.
      </p>

      <section className="section">
        <h2>Three options (uncontrolled)</h2>
        <p>
          No <code>value</code> prop — the component manages its own state. Click the toggle to
          cycle.
        </p>
        <ThreeToggle
          values={["light", "auto", "dark"]}
          defaultValue="auto"
          className="toggle-root"
          indicatorClassName="toggle-indicator"
          optionClassName="toggle-option"
        />
      </section>

      <section className="section">
        <h2>Controlled + wrap</h2>
        <p>
          External state via <code>value</code> + <code>onValueChange</code>. <code>wrap</code>{" "}
          cycles back to the first option after the last.
        </p>
        <ThreeToggle
          values={["light", "auto", "dark"]}
          value={light}
          onValueChange={setLight}
          wrap
          className="toggle-root"
          indicatorClassName="toggle-indicator"
          optionClassName="toggle-option"
        />
        <div className="value">current: {light}</div>
      </section>

      <section className="section">
        <h2>Four sizes</h2>
        <p>
          Not limited to three. Use <code>&#123; label, value &#125;</code> for icons or rich
          labels.
        </p>
        <ThreeToggle
          values={["S", "M", "L", "XL"]}
          value={size}
          onValueChange={setSize}
          wrap
          className="toggle-root"
          indicatorClassName="toggle-indicator"
          optionClassName="toggle-option"
          style={{ minWidth: 320 }}
        />
        <div className="value">size: {size}</div>
      </section>

      <a
        className="github-link"
        href="https://github.com/piro0919/react-three-toggle"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub →
      </a>
    </div>
  );
}
