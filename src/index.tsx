import React, {
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { nanoid } from "nanoid";
import {
  Inner,
  Select,
  Selected,
  SelectedProps,
  Wrapper,
  WrapperProps,
} from "./styles";
import detectTouchEvents from "detect-touch-events";
import useDidUpdate from "@rooks/use-did-update";

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
    const uniqueValues = useMemo(
      () =>
        values.map((v) =>
          typeof v === "string"
            ? {
                id: nanoid(),
                label: null,
                value: v,
              }
            : {
                ...v,
                id: nanoid(),
              }
        ),
      [values]
    );
    const [currentIndex, setCurrentIndex] = useState(() => {
      if (typeof initialValue === "undefined") {
        return 0;
      }

      return uniqueValues.findIndex(({ value }) => initialValue === value) || 0;
    });
    const currentLabel = useMemo(() => {
      const { label } = uniqueValues[currentIndex];

      return label;
    }, [currentIndex, uniqueValues]);
    const currentValue = useMemo(() => {
      const { value } = uniqueValues[currentIndex];

      return value;
    }, [currentIndex, uniqueValues]);
    const options = useMemo(
      () =>
        uniqueValues.map(({ id, value }) => <option key={id} value={value} />),
      [uniqueValues]
    );
    const handleChange = useCallback(() => {}, []);
    const [enabledTouch, setEnabledTouch] = useState(false);
    const [wrap, setWrap] = useState(false);
    const callback = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        if (isWrap) {
          return wrap ? prevIndex - 1 : prevIndex + 1;
        }

        const nextIndex = prevIndex + 1;

        return nextIndex === uniqueValues.length ? 0 : nextIndex;
      });
    }, [isWrap, uniqueValues.length, wrap]);
    const handleClick = useCallback(() => {
      if (enabledTouch) {
        return;
      }

      callback();
    }, [callback, enabledTouch]);
    const handleTouchStart = useCallback(() => {
      if (!enabledTouch) {
        return;
      }

      callback();
    }, [callback, enabledTouch]);
    const length = useMemo(() => uniqueValues.length, [uniqueValues.length]);

    useEffect(() => {
      const { hasSupport } = detectTouchEvents;

      setEnabledTouch(!!hasSupport);
    }, []);

    useEffect(() => {
      if (currentIndex !== 0 && currentIndex !== uniqueValues.length - 1) {
        return;
      }

      setWrap(currentIndex === uniqueValues.length - 1);
    }, [currentIndex, uniqueValues.length]);

    useDidUpdate(() => {
      if (!onChange) {
        return;
      }

      const currentValue = values[currentIndex];

      onChange(currentValue);
    }, [currentIndex, onChange, values]);

    return (
      <>
        <Wrapper
          className={wrapperClassName}
          height={height}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          style={wrapperStyle}
          width={width}
        >
          <Inner>
            <Selected
              className={selectedClassName}
              height={height}
              index={currentIndex}
              isVertical={isVertical}
              length={length}
              style={selectedStyle}
              width={width}
            >
              {currentLabel}
            </Selected>
          </Inner>
        </Wrapper>
        <Select
          name={name}
          onChange={handleChange}
          ref={ref}
          value={currentValue}
        >
          {options}
        </Select>
      </>
    );
  }
);

export default ReactThreeToggle;
