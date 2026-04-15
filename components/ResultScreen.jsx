"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ShareCard from "./ShareCard";
import Link from "next/link";
import { getUser } from "@/lib/store";

export default function ResultScreen({ quiz, result, breakdown, archetype, coinsEarned, newBadge, onRetry }) {
  const [showShareCard, setShowShareCard] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (u?.displayName) setUserName(u.displayName);
  }, []);

  const breakdownEntries = Object.entries(breakdown).map(([key, pct]) => {
    const r = quiz.results[key];
    return {
      key,
      label: r?.identity_label || key,
      pct,
    };
  });

  // Sort breakdown by pct descending
  breakdownEntries.sort((a, b) => b.pct - a.pct);

  return (
    <div className="min-h-screen pb-10" style={{ background: result.bg_color }}>
      {/* Coins Earned Banner */}
      {coinsEarned > 0 && (
        <div className="py-2 text-center text-sm font-semibold animate-coin-pop"
          style={{ background: "#FFF8E7", color: "#B8860B" }}>
          🪙 +{coinsEarned} เหรียญ!
        </div>
      )}

      {/* Identity Reveal */}
      <div className="text-center pt-8 pb-6 px-4 animate-fade-in-up">
        <span className="text-5xl block mb-3">{result.emoji}</span>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {quiz.metadata.title.replace("ค้นหา ", "").replace(" ของคุณ", "")} ของคุณ
        </p>
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: result.color }}>
          {result.identity_label}
        </h1>
        <p className="text-sm text-muted">{result.identity_label_en}</p>
      </div>

      {/* Score Breakdown */}
      <div className="flex justify-center gap-4 px-4 mb-6">
        {breakdownEntries.map((entry) => (
          <div key={entry.key} className="text-center">
            <p className="text-lg font-bold" style={{ color: result.color }}>
              {entry.pct}%
            </p>
            <p className="text-xs text-muted">{entry.label}</p>
          </div>
        ))}
      </div>

      {/* Headline */}
      <div className="px-4 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-base font-bold text-text">{result.headline}</h2>
      </div>

      {/* Personalized Insight */}
      <div className="mx-4 mb-6 bg-white rounded-2xl p-4 border border-border animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}>
        <p className="text-xs font-semibold text-muted uppercase mb-2">Personalized Insight</p>
        <p className="text-sm text-text leading-relaxed">{result.description}</p>
      </div>

      {/* Routine */}
      {result.routine && result.routine.length > 0 && (
        <div className="mx-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-sm font-bold text-text mb-3">
            🧴 Routine ที่เหมาะกับคุณ
          </h3>
          <div className="bg-white rounded-2xl border border-border p-4">
            {result.routine.map((step, i) => (
              <div key={i} className={`flex gap-3 ${i < result.routine.length - 1 ? "mb-3 pb-3 border-b border-border" : ""}`}>
                <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: result.color }}>
                  {step.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">{step.title}</p>
                  <p className="text-xs text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {result.products && result.products.length > 0 && (
        <div className="mx-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-sm font-bold text-text mb-3">
            🎁 สินค้าที่เหมาะกับคุณ
          </h3>
          <div className="flex flex-col gap-3">
            {result.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showMatchScore={quiz.app_config?.show_match_score}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pro Tips */}
      {result.pro_tips && result.pro_tips.length > 0 && (
        <div className="mx-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-sm font-bold text-text mb-3">💡 Pro Tips สำหรับคุณ</h3>
          <div className="bg-gold-light rounded-2xl p-4">
            {result.pro_tips.map((tip, i) => (
              <p key={i} className={`text-sm text-gold ${i < result.pro_tips.length - 1 ? "mb-2" : ""}`}>
                • {tip}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 flex flex-col gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        <button
          onClick={() => setShowShareCard(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-base rounded-xl active:scale-[0.97] transition-transform shadow-lg"
        >
          🤳 แชร์ผลให้เพื่อน <span className="text-xs opacity-90">(+5 🪙)</span>
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRetry}
            className="py-3 bg-white border-2 border-border text-text font-semibold text-sm rounded-xl text-center active:scale-[0.97] transition-transform"
          >
            🔄 ทำใหม่
          </button>
          <Link
            href="/"
            className="py-3 bg-white border-2 border-border text-text font-semibold text-sm rounded-xl text-center active:scale-[0.97] transition-transform"
          >
            🏠 หน้าแรก
          </Link>
        </div>
      </div>

      {/* New Badge */}
      {newBadge && (
        <div className="mx-4 mb-8 bg-purple-light rounded-2xl p-4 text-center animate-coin-pop">
          <p className="text-xs text-purple mb-1">🎉 Badge ใหม่!</p>
          <p className="text-lg">{newBadge.emoji}</p>
          <p className="text-sm font-bold text-purple">{newBadge.name}</p>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCard
          shareCardData={result.share_card}
          quizTitle={quiz.metadata.title}
          quizId={quiz.quiz_id}
          archetype={archetype}
          userName={userName}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
