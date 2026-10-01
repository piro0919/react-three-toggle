import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("radio", { name: "red" })).toHaveAttribute("aria-checked", "true");
  });

  it("respects defaultValue", () => {
    render(<ThreeToggle values={["red", "green", "blue"]} defaultValue="blue" />);
    expect(screen.getByRole("radio", { name: "blue" })).toHaveAttribute("aria-checked", "true");
  });

  it("cycles forward on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["red", "green", "blue"]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radiogroup"));
    expect(onValueChange).toHaveBeenCalledWith("green");
    await user.click(screen.getByRole("radiogroup"));
    expect(onValueChange).toHaveBeenCalledWith("blue");
  });

  it("stops at end when wrap is false", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ThreeToggle
        values={["red", "green", "blue"]}
        defaultValue="blue"
        wrap={false}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("radiogroup"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("wraps to start by default", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ThreeToggle
        values={["red", "green", "blue"]}
        defaultValue="blue"
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("radiogroup"));
    expect(onValueChange).toHaveBeenCalledWith("red");
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
    await user.click(screen.getByRole("radiogroup"));
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
    await user.click(screen.getByRole("radiogroup"));
    expect(screen.getByText("current: green")).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["a", "b", "c"]} onValueChange={onValueChange} />);
    await user.tab();
    expect(screen.getByRole("radio", { name: "a" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("radio", { name: "b" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(onValueChange).toHaveBeenLastCalledWith("a");
    await user.keyboard("{ArrowDown}");
    expect(onValueChange).toHaveBeenLastCalledWith("b");
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith("c");
    await user.keyboard("{Home}");
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
    await user.click(screen.getByRole("radiogroup"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("is a radio group with one tab stop on the checked radio", () => {
    render(<ThreeToggle values={["a", "b", "c"]} defaultValue="b" aria-label="Theme" />);
    expect(screen.getByRole("radiogroup", { name: "Theme" })).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("tabindex"))).toEqual(["-1", "0", "-1"]);
    expect(radios.map((r) => r.getAttribute("aria-checked"))).toEqual(["false", "true", "false"]);
  });

  it("takes no tab stop when disabled", () => {
    render(<ThreeToggle values={["a", "b"]} disabled />);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-disabled", "true");
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveAttribute("tabindex", "-1");
    }
  });

  it("checks the named radio when assistive tech activates it", () => {
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["a", "b", "c"]} onValueChange={onValueChange} />);
    // fireEvent.click carries detail 0, like a screen reader's click.
    fireEvent.click(screen.getByRole("radio", { name: "c" }));
    expect(onValueChange).toHaveBeenCalledWith("c");
  });

  it("still cycles when a pointer clicks one of the radios", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ThreeToggle values={["a", "b", "c"]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radio", { name: "c" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("keeps the selected value when values are reordered", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ThreeToggle values={["a", "b", "c"]} />);
    await user.click(screen.getByRole("radiogroup"));
    expect(screen.getByRole("radio", { name: "b" })).toHaveAttribute("aria-checked", "true");
    rerender(<ThreeToggle values={["c", "b", "a"]} />);
    expect(screen.getByRole("radio", { name: "b" })).toHaveAttribute("aria-checked", "true");
    rerender(<ThreeToggle values={["b", "a", "c"]} />);
    expect(screen.getByRole("radio", { name: "b" })).toHaveAttribute("aria-checked", "true");
  });

  describe("development warnings", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("warns when defaultValue is not one of the values", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<ThreeToggle values={["a", "b"]} defaultValue="z" />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('defaultValue "z"'));
      expect(screen.getByRole("radio", { name: "a" })).toHaveAttribute("aria-checked", "true");
    });

    it("warns when value is not one of the values", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<ThreeToggle values={["a", "b"]} value="z" />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('value "z"'));
    });

    it("warns about duplicate values once", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {}); // React's duplicate key warning
      const { rerender } = render(<ThreeToggle values={["a", "b", "a"]} />);
      rerender(<ThreeToggle values={["a", "b", "a"]} />);
      const duplicate = warn.mock.calls.filter(([m]) => String(m).includes('"a" more than once'));
      expect(duplicate).toHaveLength(1);
    });

    it("stays quiet for valid props", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<ThreeToggle values={["a", "b"]} defaultValue="b" />);
      render(<ThreeToggle values={["a", "b"]} />);
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
