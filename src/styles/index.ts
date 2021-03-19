import styled from "@emotion/styled";

export type WrapperProps = {
  height: number;
  width: number;
};

export const Wrapper = styled.div<WrapperProps>`
  border: 1px solid #ccc;
  border-radius: ${({ height }) => `${height}px`};
  box-sizing: content-box;
  cursor: pointer;
  height: ${({ height }) => `${height}px`};
  padding: 4px;
  width: ${({ width }) => `${width}px`};
`;

export const Inner = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

export type SelectedProps = {
  height: number;
  isVertical?: boolean;
  selected: "first" | "second" | "third";
  width: number;
};

export const Selected = styled.div<SelectedProps>`
  background: #aaa;
  border-radius: 50%;
  height: ${({ height, isVertical, width }) =>
    `${isVertical ? width : height}px`};
  left: ${({ height, isVertical, selected }) =>
    isVertical
      ? 0
      : selected === "first"
      ? 0
      : `calc((100% - ${height}px) / ${selected === "second" ? 2 : 1})`};
  position: absolute;
  transition: 100ms;
  top: ${({ isVertical, selected, width }) =>
    isVertical
      ? selected === "first"
        ? 0
        : `calc((100% - ${width}px) / ${selected === "second" ? 2 : 1})`
      : 0};
  width: ${({ height, isVertical, width }) =>
    `${isVertical ? width : height}px`};
`;

export const Select = styled.select`
  display: none;
`;
