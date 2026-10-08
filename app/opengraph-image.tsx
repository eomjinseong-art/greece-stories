import { ImageResponse } from "next/og";

export const alt = "그리스이야기 · 쉬운 그리스 역사";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const title = "그리스이야기";
  const sub = "어려운 그리스 역사를, 짧은 한국어로";
  const font = await loadFont(`${title}${sub}GREECE STORIES 시대 폴리스 인물 가족 전쟁 일상`);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f3f0e8",
          color: "#1c2430",
          padding: "72px",
          borderTop: "18px solid #1a5278",
          borderBottom: "18px solid #3e5340",
          fontFamily: font ? "NotoSerifKR" : "serif",
        }}
      >
        <div style={{ color: "#1a5278", fontSize: 28, letterSpacing: 8 }}>GREECE STORIES</div>
        <div style={{ marginTop: 20, fontSize: 92 }}>{title}</div>
        <div style={{ marginTop: 18, fontSize: 34, color: "#5c6670" }}>{sub}</div>
        <div style={{ marginTop: 36, fontSize: 26, color: "#3e5340" }}>시대 · 폴리스 · 인물 · 가족 · 전쟁 · 일상</div>
      </div>
    ),
    {
      ...size,
      ...(font ? { fonts: [{ name: "NotoSerifKR", data: font, weight: 700 as const, style: "normal" as const }] } : {}),
    },
  );
}
