"use client";

import { useState } from "react";
import { shareResult } from "@/lib/utils";
import { recordShare } from "@/lib/store";

export default function ShareCard({ shareCardData, quizTitle, quizId, archetype, userName, onClose }) {
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);

  const breakdownEntries = Object.entries(shareCardData.breakdown || {});

  function buildUrl() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const path = archetype
      ? `/quiz/${quizId}/result/${archetype}`
      : `/quiz/${quizId}`;
    const qs = userName ? `?from=${encodeURIComponent(userName)}` : "";
    return `${origin}${path}${qs}`;
  }

  function buildText() {
    const cleanTitle = (quizTitle || "")
      .replace(/^ค้นหา\s*/, "")
      .replace(/\s*ของคุณ.*$/, "");
    const titlePart = cleanTitle ? `Quiz "${cleanTitle}"` : "Quiz นี้";
    return [
      `เพิ่งทำ ${titlePart} มา 😮`,
      `ผลออกว่าฉันเป็น "${shareCardData.identity_label}" ${shareCardData.emoji}`,
      `ตรงเวอร์... คุณเป็นแบบไหน? ลองดู 👇`,
      `(ใช้เวลาแค่ 2 นาที)`,
    ].join("\n");
  }

  const handleShare = async () => {
    const url = buildUrl();
    const text = buildText();
    const result = await shareResult(text, url);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (result) {
      recordShare();
      setShared(true);
    }
  };

  const handleLine = () => {
    const url = buildUrl();
    const text = buildText();
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
    recordShare();
    setShared(true);
  };

  const handleCopy = async () => {
    const url = buildUrl();
    const text = buildText();
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      recordShare();
      setShared(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden animate-fade-in-up">
        {/* Close button */}
        <div className="flex justify-end p-3">
          <button onClick={onClose} className="text-muted text-lg px-2">✕</button>
        </div>

        {/* Card Content */}
        <div
          className="mx-4 mb-4 rounded-2xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, #E8F5F0 0%, #F0EEFF 100%)" }}
        >
          <p className="text-xs text-muted mb-1">MY RESULT</p>
          <span className="text-4xl block mb-2">{shareCardData.emoji}</span>
          <h3 className="text-lg font-extrabold text-text mb-1">
            {shareCardData.identity_label}
          </h3>
          <p className="text-xs text-muted mb-4">{shareCardData.subtitle}</p>

          {/* Breakdown */}
          <div className="flex justify-center gap-4">
            {breakdownEntries.map(([label, pct]) => (
              <div key={label} className="text-center">
                <p className="text-sm font-bold text-primary">{pct}%</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted mt-4">{shareCardData.cta_text}</p>
          <p className="text-xs font-semibold text-primary mt-1">PickSmart</p>
        </div>

        {/* Share Buttons */}
        <div className="px-4 pb-4 flex flex-col gap-2">
          <button
            onClick={handleLine}
            className="w-full py-3 bg-[#06C755] text-white font-bold text-sm rounded-xl active:scale-[0.97] transition-transform flex items-center justify-center gap-2"
          >
            <span className="text-base">💬</span> แชร์ผ่าน LINE
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShare}
              className="py-2.5 bg-purple text-white font-semibold text-xs rounded-xl active:scale-[0.97] transition-transform"
            >
              {shared && !copied ? "แชร์แล้ว 🎉" : "🤳 แชร์อื่นๆ"}
            </button>
            <button
              onClick={handleCopy}
              className="py-2.5 bg-white border-2 border-purple text-purple font-semibold text-xs rounded-xl active:scale-[0.97] transition-transform"
            >
              {copied ? "คัดลอกแล้ว ✅" : "🔗 คัดลอกลิงก์"}
            </button>
          </div>
          {!shared && (
            <p className="text-[11px] text-center text-muted mt-1">แชร์แล้วได้ +5 เหรียญ 🪙</p>
          )}
        </div>
      </div>
    </div>
  );
}
