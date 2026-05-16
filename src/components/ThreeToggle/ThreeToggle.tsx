"use client";

import { useCallback, useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";

export type ThreeToggleOption =
  | string
  | {
      label?: ReactNode;
      value: string;
    };

type NormalizedOption = { label: ReactNode; value: string };

export type ThreeToggleProps = {
  values: ThreeToggleOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  wrap?: boolean;
  orientation?: "horizontal" | "vertical";
  name?: string;
  disabled?: boolean;
  className?: string;
  indicatorClassName?: string;
  optionClassName?: string;
  style?: CSSProperties;
};

function normalize(option: ThreeToggleOption): NormalizedOption {
  if (typeof option === "string") return { label: option, value: option };
  return { label: option.label ?? option.value, value: option.value };
}

export function ThreeToggle({
  values,
  defaultValue,
  value: controlledValue,
  onValueChange,
  wrap = true,
  orientation = "horizontal",
  name,
  disabled = false,
  className,
  indicatorClassName,
  optionClassName,
  style,
}: ThreeToggleProps) {
  const options = useMemo(() => values.map(normalize), [values]);

  if (options.length === 0) {
    throw new Error("<ThreeToggle> requires at least one value.");
  }

  const findIndex = useCallback(
    (v: string | undefined) => {
      if (v === undefined) return 0;
      const idx = options.findIndex((o) => o.value === v);
      return idx >= 0 ? idx : 0;
    },
    [options],
  );

  const [uncontrolledIndex, setUncontrolledIndex] = useState(() => findIndex(defaultValue));
  const isControlled = controlledValue !== undefined;
  const currentIndex = isControlled ? findIndex(controlledValue) : uncontrolledIndex;
  const current = options[currentIndex]!;

  const advance = useCallback(
    (direction: 1 | -1) => {
      if (disabled) return;
      const len = options.length;
      let next = currentIndex + direction;
      if (wrap) {
        next = ((next % len) + len) % len;
      } else {
        next = Math.max(0, Math.min(len - 1, next));
        if (next === currentIndex) return;
      }
      const nextValue = options[next]!.value;
      if (!isControlled) setUncontrolledIndex(next);
      onValueChange?.(nextValue);
    },
    [currentIndex, options, wrap, disabled, isControlled, onValueChange],
  );

  const onClick = useCallback(() => advance(1), [advance]);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const isHorizontal = orientation === "horizontal";
      if ((isHorizontal && e.key === "ArrowRight") || (!isHorizontal && e.key === "ArrowDown")) {
        e.preventDefault();
        advance(1);
      } else if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (!isHorizontal && e.key === "ArrowUp")
      ) {
        e.preventDefault();
        advance(-1);
      }
    },
    [advance, disabled, orientation],
  );

  const reactId = useId();
  const groupId = `srt-${reactId}`;

  const rootStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    ...style,
  };

  const indicatorStyle: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    ...(orientation === "horizontal"
      ? {
          top: 0,
          left: 0,
          height: "100%",
          width: `${100 / options.length}%`,
          transform: `translateX(${currentIndex * 100}%)`,
        }
      : {
          top: 0,
          left: 0,
          width: "100%",
          height: `${100 / options.length}%`,
          transform: `translateY(${currentIndex * 100}%)`,
        }),
  };

  return (
    <button
      type="button"
      data-three-toggle=""
      data-orientation={orientation}
      data-disabled={disabled ? "true" : undefined}
      role="listbox"
      aria-orientation={orientation}
      aria-activedescendant={`${groupId}-${currentIndex}`}
      aria-disabled={disabled || undefined}
      className={className}
      style={rootStyle}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      <span data-part="indicator" className={indicatorClassName} style={indicatorStyle} />
      {options.map((opt, i) => (
        <span
          key={opt.value}
          id={`${groupId}-${i}`}
          data-part="option"
          data-selected={i === currentIndex ? "true" : undefined}
          className={optionClassName}
          role="option"
          aria-selected={i === currentIndex}
          style={{ position: "relative", textAlign: "center", flex: 1 }}
        >
          {opt.label}
        </span>
      ))}
      {name ? <input type="hidden" name={name} value={current.value} /> : null}
    </button>
  );
}
