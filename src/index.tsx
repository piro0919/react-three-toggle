import React, {
  CSSProperties,
  FC,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useDidUpdate from "@rooks/use-did-update";
import {
  Inner,
  Select,
  Selected,
  SelectedProps,
  Wrapper,
  WrapperProps,
} from "./styles";

type Value =
  | string
  | {
      label: ReactNode;
      value: string;
    };

export type ReactThreeToggleProps = Partial<
  Pick<WrapperProps, "height" | "width">
> &
  Partial<Pick<SelectedProps, "height" | "isVertical" | "width">> & {
    className?: Partial<
      Record<"selectedClassName" | "wrapperClassName", string>
    >;
    initialValue?: string;
    isWrap?: boolean;
    name?: string;
    onChange?: (value: Value) => void;
    ref?: Ref<HTMLSelectElement>;
    style?: Partial<Record<"selectedStyle" | "wrapperStyle", CSSProperties>>;
    values: Value[];
  };

const ReactThreeToggle: FC<ReactThreeToggleProps> = forwardRef<
  HTMLSelectElement,
  Omit<ReactThreeToggleProps, "ref">
>(
  (
    {
      className: { selectedClassName, wrapperClassName } = {
        selectedClassName: undefined,
        wrapperClassName: undefined,
      },
      height = 16,
      initialValue,
      isVertical,
      isWrap,
      name,
      onChange,
      style: { selectedStyle, wrapperStyle } = {
        selectedStyle: undefined,
        wrapperStyle: undefined,
      },
      values,
      width = 48,
    },
    ref
  ) => {
    const optionValues = useMemo(
      () =>
        values.map((v) => {
          return typeof v === "string" ? v : v.value;
        }),
      [values]
    );
    const [value, setValue] = useState(
      typeof initialValue === "string" ? initialValue : optionValues[0]
    );
    const [wrap, setWrap] = useState(false);
    const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
      (e) => {
        e.preventDefault();

        setValue((prevValue) => {
          const index = optionValues.findIndex((value) => prevValue === value);

          let value = prevValue;

          if (isWrap) {
            if (index === 0 || index === 2) {
              value = optionValues[1];
            } else {
              value = optionValues[wrap ? 0 : 2];
            }
          } else {
            value = optionValues[index === 2 ? 0 : index + 1];
          }

          return value;
        });
      },
      [isWrap, optionValues, wrap]
    );
    const options = useMemo(
      () =>
        values.map((v) =>
          typeof v === "string" ? (
            <option key={v} value={v} />
          ) : (
            <option key={v.value} value={v.value} />
          )
        ),
      [values]
    );
    const selected = useMemo<"first" | "second" | "third">(() => {
      const index = optionValues.findIndex((v) => value === v);

      return ["first" as const, "second" as const, "third" as const][index];
    }, [optionValues, value]);
    const handleChange = useCallback(() => {}, []);
    const selectedNode = useMemo(() => {
      const foundValue = values.find(
        (v) => value === (typeof v === "string" ? v : v.value)
      );

      if (!foundValue) {
        return;
      }

      return (
        <Selected
          className={selectedClassName}
          height={height}
          isVertical={isVertical}
          selected={selected}
          style={selectedStyle}
          width={width}
        >
          {typeof foundValue === "string" ? null : foundValue.label}
        </Selected>
      );
    }, [
      height,
      isVertical,
      selected,
      selectedClassName,
      selectedStyle,
      value,
      values,
      width,
    ]);

    useEffect(() => {
      if (selected !== "first" && selected !== "third") {
        return;
      }

      setWrap(selected === "third");
    }, [selected]);

    useDidUpdate(() => {
      if (!onChange) {
        return;
      }

      const currentValue = values.find((v) =>
        typeof v === "string" ? value === v : value === v.value
      );

      if (!currentValue) {
        return;
      }

      onChange(currentValue);
    }, [onChange, value]);

    return (
      <Wrapper
        className={wrapperClassName}
        height={height}
        onClick={handleClick}
        style={wrapperStyle}
        width={width}
      >
        <Inner>{selectedNode}</Inner>
        <Select name={name} onChange={handleChange} ref={ref} value={value}>
          {options}
        </Select>
      </Wrapper>
    );
  }
);

export default ReactThreeToggle;
