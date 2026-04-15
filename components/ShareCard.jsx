"use client";

import { useState } from "react";
import { shareResult } from "@/lib/utils";
import { recordShare } from "@/lib/store";

export default function ShareCard({ shareCardData, quizTitle, quizId, archetype, userName, onClose }) {
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);

  const breakdownEntries = Object.entries(shareCardData.breakdown || {});
  const topEntry = breakdownEntries.length
    ? [...breakdownEntries].sort((a, b) => b[1] - a[1])[0]
    : null;

  const handleShare = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const path = archetype
      ? `/quiz/${quizId}/result/${archetype}`
      : `/quiz/${quizId}`;
    const qs = userName ? `?from=${encodeURIComponent(userName)}` : "";
    const url = `${origin}${path}${qs}`;

    const topLine = topEntry
      ? `ฉันเป็น ${shareCardData.identity_label} ${shareCardData.emoji} (${topEntry[0]} ${topEntry[1]}%)`
      : `ฉันเป็น ${shareCardData.identity_label} ${shareCardData.emoji}`;
    const text = `${topLine}\nคุณล่ะ? เดาว่าอะไร 👉\n(ใช้เวลา 2 นาที รู้ผลเลย)`;

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

        {/* Share Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleShare}
            className="w-full py-3 bg-purple text-white font-bold text-sm rounded-xl active:scale-[0.97] transition-transform"
          >
            {copied ? "คัดลอกลิงก์แล้ว! ✅" : shared ? "แชร์แล้ว! 🎉" : "🤳 แชร์เลย"}
          </button>
          {!shared && (
            <p className="text-xs text-center text-muted mt-2">แชร์แล้วได้ +5 เหรียญ</p>
          )}
        </div>
      </div>
    </div>
  );
}
