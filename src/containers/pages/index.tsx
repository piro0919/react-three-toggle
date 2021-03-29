import React, { FC, useCallback, useMemo } from "react";
import ReactThreeToggle, { ReactThreeToggleProps } from "index";

const Pages: FC = () => {
  const values1 = useMemo(() => ["hoge", "fuga", "piyo"], []);
  const values2 = useMemo(
    () => [
      { label: "hoge", value: "hoge" },
      { label: "fuga", value: "fuga" },
      { label: "piyo", value: "piyo" },
      { label: "moge", value: "moge" },
    ],
    []
  );
  const handleChange = useCallback<
    NonNullable<ReactThreeToggleProps["onChange"]>
  >((value) => {
    console.log(value);
  }, []);

  return (
    <div>
      <h1>react-three-toggle</h1>
      <article>
        <h2>Simple</h2>
        <ReactThreeToggle values={values1} />
      </article>
      <hr />
      <article>
        <h2>Full Customize</h2>
        <ReactThreeToggle
          className={{
            selectedClassName: "moge1",
            wrapperClassName: "moge2",
          }}
          height={96}
          onChange={handleChange}
          initialValue="piyo"
          isVertical={true}
          isWrap={true}
          style={{
            selectedStyle: {
              background: "red",
              borderRadius: 0,
              color: "white",
              fontSize: "12px",
              lineHeight: "32px",
              textAlign: "center",
              transition: "250ms",
            },
            wrapperStyle: {
              background: "pink",
              border: "none",
              borderRadius: 0,
              padding: 0,
            },
          }}
          values={values2}
          width={32}
        />
      </article>
    </div>
  );
};

export default Pages;
