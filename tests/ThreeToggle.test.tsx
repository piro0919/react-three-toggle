import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ThreeToggle } from "../src";

describe("ThreeToggle", () => {
  it("renders all options", () => {
    render(<ThreeToggle values={["red", "green", "blue"]} />);
    expect(screen.getByText("red")).toBeInTheDocument();
    expect(screen.getByText("green")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
  });

  it("selects first option by default", () => {
    render(<ThreeToggle values={["red", "green", "blue"]} />);
    expect(screen.getByText("red")).toHaveAttribute("aria-selected", "true");
  });

  it("respects defaultValue", () => {
    render(<ThreeToggle values={["red", "green", "blue"]} defaultValue="blue" />);
    expect(screen.getByText("blue")).toHaveAttribute("aria-selected", "true");
  });

  it("cycles forward on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["red", "green", "blue"]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("listbox"));
    expect(onValueChange).toHaveBeenCalledWith("green");
    await user.click(screen.getByRole("listbox"));
    expect(onValueChange).toHaveBeenCalledWith("blue");
  });

  it("stops at end without wrap", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ThreeToggle
        values={["red", "green", "blue"]}
        defaultValue="blue"
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("listbox"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("wraps to start when wrap is true", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ThreeToggle
        values={["red", "green", "blue"]}
        defaultValue="blue"
        wrap
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("listbox"));
    expect(onValueChange).toHaveBeenCalledWith("red");
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [v, setV] = useState("red");
      return (
        <>
          <ThreeToggle values={["red", "green", "blue"]} value={v} onValueChange={setV} />
          <p>current: {v}</p>
        </>
      );
    }
    render(<Controlled />);
    expect(screen.getByText("current: red")).toBeInTheDocument();
    await user.click(screen.getByRole("listbox"));
    expect(screen.getByText("current: green")).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["a", "b", "c"]} onValueChange={onValueChange} />);
    const btn = screen.getByRole("listbox");
    btn.focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("b");
    await user.keyboard("{ArrowLeft}");
    expect(onValueChange).toHaveBeenLastCalledWith("a");
  });

  it("supports { label, value } shape", () => {
    render(
      <ThreeToggle
        values={[
          { label: "🍎 Apple", value: "apple" },
          { label: "🍊 Orange", value: "orange" },
        ]}
      />,
    );
    expect(screen.getByText("🍎 Apple")).toBeInTheDocument();
    expect(screen.getByText("🍊 Orange")).toBeInTheDocument();
  });

  it("renders hidden input when name is provided", () => {
    const { container } = render(
      <ThreeToggle values={["a", "b"]} name="choice" defaultValue="b" />,
    );
    const hidden = container.querySelector("input[type=hidden]");
    expect(hidden).toHaveAttribute("name", "choice");
    expect(hidden).toHaveAttribute("value", "b");
  });

  it("ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["a", "b"]} disabled onValueChange={onValueChange} />);
    await user.click(screen.getByRole("listbox"));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
