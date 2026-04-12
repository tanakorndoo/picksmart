"use client";

import BADGES from "@/lib/badges";

const CATEGORY_LABELS = {
  quiz: "🎯 จำนวน Quiz",
  streak: "🔥 Streak",
  social: "📢 แชร์",
  category: "📂 หมวดหมู่",
  special: "⭐ พิเศษ",
  coins: "💰 เหรียญ",
};

export default function BadgeShowcase({ user, onClose }) {
  const earned = user.badges || [];

  const grouped = {};
  BADGES.forEach((b) => {
    const label = CATEGORY_LABELS[b.category] || b.category;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(b);
  });

  const totalEarned = earned.length;
  const totalBadges = BADGES.length;
  const percent = Math.round((totalEarned / totalBadges) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-3 border-b border-gray-100 rounded-t-3xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">🏅 ฉายาทั้งหมด</h2>
            <button onClick={onClose} className="text-gray-400 text-xl leading-none">&times;</button>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-500 shrink-0">
              {totalEarned}/{totalBadges}
            </span>
          </div>
        </div>

        {/* Badge Groups */}
        <div className="px-4 mt-4 space-y-5">
          {Object.entries(grouped).map(([groupLabel, badges]) => (
            <div key={groupLabel}>
              <h3 className="text-sm font-bold text-gray-700 mb-2">{groupLabel}</h3>
              <div className="grid grid-cols-2 gap-2">
                {badges.map((badge) => {
                  const isEarned = earned.includes(badge.key);
                  return (
                    <div
                      key={badge.key}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                        isEarned
                          ? "border-amber-200 bg-amber-50"
                          : "border-gray-100 bg-gray-50 opacity-50"
                      }`}
                    >
                      <span className={`text-2xl ${isEarned ? "" : "grayscale"}`}>
                        {isEarned ? badge.emoji : "🔒"}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-[12px] font-bold leading-tight ${
                          isEarned ? "text-gray-800" : "text-gray-400"
                        }`}>
                          {badge.name}
                        </p>
                        <p className="text-[10px] text-gray-400 line-clamp-1">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
