import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { ImageResponse } from "next/og";

export const alt = "react-three-toggle";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const TITLE = "react-three-toggle";
const DESCRIPTION = "A three-state toggle component for React.";

export default async function Image() {
  /* 見出しの書体はサイトと同じ Outfit。使う文字だけに絞ったものを
     同梱している。文言を変えたら assets/README.md の手順で作り直す */
  const font = await readFile(join(cwd(), "assets/Outfit-700-subset.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        background: "#0b0b0f",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          {TITLE}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 28,
            lineHeight: 1.4,
            color: "#a1a1aa",
          }}
        >
          {DESCRIPTION}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 48,
            color: "#71717a",
          }}
        >
          kkweb.io
        </div>
      </div>

      {/* 何をするパッケージなのかを右に置く。名前と説明だけだと、
          9件が同じ絵になってタイムラインで見分けが付かない */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#15151c",
            border: "1px solid #26262f",
            borderRadius: 999,
            display: "flex",
            gap: 8,
            padding: 10,
          }}
        >
          {["light", "auto", "dark"].map((label) => (
            <div
              key={label}
              style={{
                alignItems: "center",
                background: label === "auto" ? "#fb7185" : "transparent",
                borderRadius: 999,
                color: label === "auto" ? "#1a0509" : "#71717a",
                display: "flex",
                fontSize: 26,
                fontWeight: label === "auto" ? 700 : 400,
                height: 62,
                justifyContent: "center",
                width: 108,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ data: font, name: "Outfit", style: "normal", weight: 700 }],
    },
  );
}
