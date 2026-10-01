"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

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
  /** Accessible name of the group, when no visible label points at it. */
  "aria-label"?: string;
  /** Id of the element that labels the group. */
  "aria-labelledby"?: string;
};

function normalize(option: ThreeToggleOption): NormalizedOption {
  if (typeof option === "string") return { label: option, value: option };
  return { label: option.label ?? option.value, value: option.value };
}

/**
 * Warns once per message per component, in development only. Bundlers replace
 * `process.env.NODE_ENV`, so the check and the strings drop out of production
 * builds.
 */
function useDevWarnings(messages: string[]) {
  const warned = useRef(new Set<string>());
  const key = messages.join("\n");
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    for (const message of key ? key.split("\n") : []) {
      if (warned.current.has(message)) continue;
      warned.current.add(message);
      console.warn(`<ThreeToggle> ${message}`);
    }
  }, [key]);
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ThreeToggleProps) {
  const options = useMemo(() => values.map(normalize), [values]);

  if (options.length === 0) {
    throw new Error("<ThreeToggle> requires at least one value.");
  }

  const isControlled = controlledValue !== undefined;
  // Kept as a value, not an index, so reordering `values` keeps the selection.
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;
  const foundIndex =
    selectedValue === undefined ? -1 : options.findIndex((o) => o.value === selectedValue);
  // Nothing chosen yet, or a value that is not in the list: the first option.
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const current = options[currentIndex]!;

  const warnings: string[] = [];
  const seen = new Set<string>();
  for (const { value } of options) {
    if (seen.has(value)) {
      warnings.push(`received the value "${value}" more than once. Values must be unique.`);
    }
    seen.add(value);
  }
  if (isControlled && foundIndex < 0) {
    warnings.push(
      `value "${controlledValue}" is not one of its values. Showing "${current.value}".`,
    );
  } else if (!isControlled && defaultValue !== undefined && foundIndex < 0) {
    warnings.push(
      `defaultValue "${defaultValue}" is not one of its values. Showing "${current.value}".`,
    );
  }
  useDevWarnings(warnings);

  const select = useCallback(
    (next: number) => {
      if (disabled || next === currentIndex) return;
      const nextValue = options[next]!.value;
      if (!isControlled) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    },
    [currentIndex, options, disabled, isControlled, onValueChange],
  );

  const advance = useCallback(
    (direction: 1 | -1) => {
      const len = options.length;
      const next = currentIndex + direction;
      select(wrap ? ((next % len) + len) % len : Math.max(0, Math.min(len - 1, next)));
    },
    [currentIndex, options.length, wrap, select],
  );

  const radios = useRef<(HTMLElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);

  // Roving focus: whenever the selection moves while focus is inside the group,
  // focus follows it, so the one tab stop is always the checked radio.
  useEffect(() => {
    const target = radios.current[currentIndex];
    if (
      target &&
      root.current?.contains(document.activeElement) &&
      document.activeElement !== target
    ) {
      target.focus();
    }
  }, [currentIndex]);

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      // A pointer click anywhere cycles — that is what the component is for.
      // A click with no pointer behind it (detail 0) comes from assistive tech
      // activating one named radio, so check that radio instead.
      if (e.detail === 0) {
        const radio = (e.target as HTMLElement).closest<HTMLElement>("[role=radio]");
        const index = radio ? radios.current.indexOf(radio as HTMLElement) : -1;
        if (index >= 0) {
          select(index);
          return;
        }
      }
      advance(1);
    },
    [advance, disabled, select],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          advance(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          advance(-1);
          break;
        case "Home":
          e.preventDefault();
          select(0);
          break;
        case "End":
          e.preventDefault();
          select(options.length - 1);
          break;
        case " ": {
          e.preventDefault();
          const index = radios.current.indexOf(e.target as HTMLElement);
          if (index >= 0) select(index);
          break;
        }
      }
    },
    [advance, disabled, options.length, select],
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
    <div
      ref={root}
      data-three-toggle=""
      data-orientation={orientation}
      data-disabled={disabled ? "true" : undefined}
      role="radiogroup"
      aria-orientation={orientation}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      style={rootStyle}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span data-part="indicator" className={indicatorClassName} style={indicatorStyle} />
      {options.map((opt, i) => (
        <span
          key={opt.value}
          ref={(el) => {
            radios.current[i] = el;
          }}
          id={`${groupId}-${i}`}
          data-part="option"
          data-selected={i === currentIndex ? "true" : undefined}
          className={optionClassName}
          role="radio"
          aria-checked={i === currentIndex}
          aria-disabled={disabled || undefined}
          tabIndex={!disabled && i === currentIndex ? 0 : -1}
          style={{ position: "relative", textAlign: "center", flex: 1 }}
        >
          {opt.label}
        </span>
      ))}
      {name ? <input type="hidden" name={name} value={current.value} /> : null}
    </div>
  );
}
