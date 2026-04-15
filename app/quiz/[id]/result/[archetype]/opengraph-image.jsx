import { ImageResponse } from "next/og";
import quizData from "@/data/quizzes.json";

export const runtime = "edge";
export const alt = "PickSmart Quiz Result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }) {
  return [{ id: "default", size, alt, contentType }];
}

async function loadFonts(text) {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Prompt:wght@400;700;900&text=${encodeURIComponent(
      text
    )}&display=swap`;
    const css = await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    }).then((r) => r.text());

    const blocks = css.split("@font-face").slice(1);
    const fonts = [];
    for (const b of blocks) {
      const urlMatch = b.match(/url\((https:\/\/[^)]+\.woff2)\)/);
      const weightMatch = b.match(/font-weight:\s*(\d+)/);
      if (!urlMatch) continue;
      const weight = weightMatch ? parseInt(weightMatch[1], 10) : 400;
      const data = await fetch(urlMatch[1]).then((r) => r.arrayBuffer());
      fonts.push({ name: "Prompt", data, weight, style: "normal" });
    }
    return fonts;
  } catch {
    return [];
  }
}

export default async function Image({ params }) {
  const quiz = quizData.quizzes.find((q) => q.quiz_id === params.id);
  const result = quiz?.results?.[params.archetype];
  const share = result?.share_card || {};

  const emoji = share.emoji || result?.emoji || "✨";
  const label = share.identity_label || result?.identity_label || "PickSmart";
  const subtitle = share.subtitle || result?.headline || "";
  const quizTitle = quiz?.metadata?.title || "PickSmart Quiz";
  const bgColor = result?.bg_color || "#E8F5F0";
  const accentColor = result?.color || "#0B6E4F";

  const breakdown = share.breakdown || {};
  const breakdownEntries = Object.entries(breakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${bgColor} 0%, #F0EEFF 100%)`,
          padding: 60,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#666", letterSpacing: 4 }}>MY RESULT</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: accentColor }}>PickSmart</div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 200, lineHeight: 1, marginBottom: 20 }}>{emoji}</div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: accentColor,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {label}
          </div>
          <div style={{ fontSize: 32, color: "#444", maxWidth: 900, lineHeight: 1.4 }}>
            {subtitle}
          </div>

          {breakdownEntries.length > 0 && (
            <div style={{ display: "flex", gap: 40, marginTop: 32 }}>
              {breakdownEntries.map(([k, v]) => (
                <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: accentColor }}>{v}%</div>
                  <div style={{ fontSize: 20, color: "#666" }}>{k}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(0,0,0,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 28, color: "#333", fontWeight: 600 }}>
            คุณเป็นแบบไหน? ทำ Quiz 2 นาที →
          </div>
          <div style={{ fontSize: 22, color: "#888" }}>{quizTitle}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: await loadFonts(
        [
          label,
          subtitle,
          quizTitle,
          "MY RESULT PickSmart คุณเป็นแบบไหน? ทำ Quiz 2 นาที →",
          ...breakdownEntries.map(([k]) => k),
        ].join(" ")
      ),
    }
  );
}
