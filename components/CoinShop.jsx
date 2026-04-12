"use client";

import { useState } from "react";
import SHOP_ITEMS, {
  getShopByCategory,
  THEMES,
  TITLES,
  GACHA_TITLES,
  LUCKY_STONES,
  DAILY_FORTUNES,
} from "@/lib/shopItems";
import {
  getUser,
  purchaseItem,
  purchaseConsumable,
  setActiveTheme,
  setActiveFrame,
  setActiveTitle,
  addGachaTitle,
  hasPurchased,
} from "@/lib/store";

export default function CoinShop({ user, onUpdate, onClose }) {
  const [toast, setToast] = useState(null);
  const [gachaResult, setGachaResult] = useState(null);
  const [titlePicker, setTitlePicker] = useState(false);
  const [dailyFortune, setDailyFortune] = useState(null);
  const [luckyStone, setLuckyStone] = useState(null);

  const shopGroups = getShopByCategory();

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  function handleBuy(item) {
    // Gacha is consumable
    if (item.category === "gacha") {
      const result = purchaseConsumable(item.id, item.price);
      if (!result.success) {
        showToast("เหรียญไม่พอ!", "error");
        return;
      }
      // Roll gacha
      const title = GACHA_TITLES[Math.floor(Math.random() * GACHA_TITLES.length)];
      addGachaTitle(title);
      setGachaResult(title);
      onUpdate(getUser());
      return;
    }

    // Title picker
    if (item.category === "title") {
      if (hasPurchased(item.id)) {
        setTitlePicker(true);
        return;
      }
      const result = purchaseItem(item.id, item.price);
      if (!result.success) {
        showToast(result.reason === "coins_not_enough" ? "เหรียญไม่พอ!" : "ซื้อแล้ว!", "error");
        return;
      }
      setTitlePicker(true);
      onUpdate(result.user);
      return;
    }

    // Normal purchase
    const result = purchaseItem(item.id, item.price);
    if (!result.success) {
      showToast(result.reason === "coins_not_enough" ? "เหรียญไม่พอ!" : "ซื้อแล้ว!", "error");
      return;
    }

    // Auto-activate
    if (item.category === "theme") {
      setActiveTheme(item.themeKey);
      applyTheme(item.themeKey);
    }
    if (item.category === "frame") {
      setActiveFrame(item.frameKey);
    }
    if (item.category === "feature" && item.id === "feature_daily_fortune") {
      showDailyFortune();
    }
    if (item.category === "feature" && item.id === "feature_lucky_stone") {
      showLuckyStone();
    }

    showToast(`ซื้อ ${item.name} สำเร็จ!`);
    onUpdate(getUser());
  }

  function applyTheme(themeKey) {
    const theme = THEMES[themeKey];
    if (!theme) return;
    document.documentElement.style.setProperty("--bg", theme.colors.bg);
    document.documentElement.style.setProperty("--primary", theme.colors.primary);
    document.documentElement.style.setProperty("--text", theme.colors.text);
  }

  function handleSelectTitle(title) {
    setActiveTitle(title);
    setTitlePicker(false);
    showToast(`ตั้งตำแหน่ง "${title}" แล้ว!`);
    onUpdate(getUser());
  }

  function showDailyFortune() {
    const topElement = getTopElement(user);
    const fortunes = DAILY_FORTUNES[topElement] || DAILY_FORTUNES.default;
    const dayIndex = new Date().getDate() % fortunes.length;
    setDailyFortune({ element: topElement, text: fortunes[dayIndex] });
  }

  function showLuckyStone() {
    const dayIndex = (new Date().getDate() + new Date().getMonth()) % LUCKY_STONES.length;
    setLuckyStone(LUCKY_STONES[dayIndex]);
  }

  function getTopElement(u) {
    const profile = u.profile || {};
    let top = "default";
    let max = 0;
    Object.entries(profile).forEach(([key, val]) => {
      if (val > max) { max = val; top = key; }
    });
    return top;
  }

  const owned = user.purchases || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-3 border-b border-gray-100 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">🛍️ ร้านค้า</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                🪙 {user.coins} เหรียญ
              </span>
              <button onClick={onClose} className="text-gray-400 text-xl leading-none">&times;</button>
            </div>
          </div>
        </div>

        {/* Reset theme button */}
        {user.activeTheme && user.activeTheme !== "default" && (
          <div className="mx-4 mt-3">
            <button
              onClick={() => {
                setActiveTheme("default");
                document.documentElement.style.removeProperty("--bg");
                document.documentElement.style.removeProperty("--primary");
                document.documentElement.style.removeProperty("--text");
                showToast("กลับเป็นธีมค่าเริ่มต้นแล้ว");
                onUpdate(getUser());
              }}
              className="w-full text-center text-xs text-gray-400 py-2 active:text-gray-600"
            >
              กลับเป็นธีมค่าเริ่มต้น
            </button>
          </div>
        )}

        {/* Daily Features (if unlocked) */}
        {owned.includes("feature_daily_fortune") && (
          <div className="mx-4 mt-4">
            <button
              onClick={showDailyFortune}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl p-3.5 text-left active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🔮</span>
                <div>
                  <p className="text-sm font-bold">ดูดวงวันนี้</p>
                  <p className="text-[11px] text-white/70">กดดูดวงประจำวันตามธาตุของคุณ</p>
                </div>
              </div>
            </button>
          </div>
        )}
        {owned.includes("feature_lucky_stone") && (
          <div className="mx-4 mt-2">
            <button
              onClick={showLuckyStone}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3.5 text-left active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">💎</span>
                <div>
                  <p className="text-sm font-bold">หินนำโชควันนี้</p>
                  <p className="text-[11px] text-white/70">สุ่มหินมงคลประจำวัน</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Shop Items */}
        <div className="px-4 mt-4 space-y-5">
          {Object.entries(shopGroups).map(([groupLabel, items]) => (
            <div key={groupLabel}>
              <h3 className="text-sm font-bold text-gray-700 mb-2">{groupLabel}</h3>
              <div className="space-y-2">
                {items.map((item) => {
                  const isOwned = owned.includes(item.id);
                  const isActive =
                    (item.category === "theme" && user.activeTheme === item.themeKey) ||
                    (item.category === "frame" && user.activeFrame === item.frameKey);
                  const canAfford = user.coins >= item.price;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isOwned
                          ? "border-green-200 bg-green-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-800">{item.name}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                      {isOwned && !item.consumable ? (
                        item.category === "feature" ? (
                          <span className="text-[11px] text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full shrink-0">
                            ปลดล็อกแล้ว
                          </span>
                        ) : isActive ? (
                          <span className="text-[11px] text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full shrink-0">
                            ใช้อยู่
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.category === "theme") {
                                setActiveTheme(item.themeKey);
                                applyTheme(item.themeKey);
                                showToast(`เปลี่ยนเป็น ${item.name} แล้ว!`);
                                onUpdate(getUser());
                              } else if (item.category === "frame") {
                                setActiveFrame(item.frameKey);
                                showToast(`เปลี่ยนเป็น ${item.name} แล้ว!`);
                                onUpdate(getUser());
                              } else if (item.category === "title") {
                                setTitlePicker(true);
                              }
                            }}
                            className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full shrink-0 active:scale-95"
                          >
                            ใช้งาน
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => handleBuy(item)}
                          disabled={!canAfford && !item.consumable}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 active:scale-95 transition-transform ${
                            canAfford
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          🪙 {item.price}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold shadow-lg z-[60] ${
            toast.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}>
            {toast.msg}
          </div>
        )}

        {/* Gacha Result Modal */}
        {gachaResult && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={() => setGachaResult(null)}>
            <div className="bg-white rounded-3xl p-6 mx-6 text-center max-w-[320px]" onClick={(e) => e.stopPropagation()}>
              <div className="text-5xl mb-3">🎰</div>
              <p className="text-sm text-gray-500 mb-1">คุณได้ฉายาใหม่!</p>
              <p className="text-xl font-bold text-purple-600 mb-4">"{gachaResult}"</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSelectTitle(gachaResult);
                    setGachaResult(null);
                  }}
                  className="flex-1 bg-purple-600 text-white text-sm font-bold py-2.5 rounded-xl active:scale-95"
                >
                  ใช้เลย!
                </button>
                <button
                  onClick={() => setGachaResult(null)}
                  className="flex-1 bg-gray-100 text-gray-600 text-sm font-bold py-2.5 rounded-xl active:scale-95"
                >
                  เก็บไว้ก่อน
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Title Picker Modal */}
        {titlePicker && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={() => setTitlePicker(false)}>
            <div className="bg-white rounded-3xl p-5 mx-6 max-w-[340px] w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold mb-3 text-center">🏷️ เลือกตำแหน่ง</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {TITLES.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleSelectTitle(t)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                      user.activeTitle === t
                        ? "bg-purple-100 text-purple-700 border border-purple-300"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t} {user.activeTitle === t && "✓"}
                  </button>
                ))}
                {/* Gacha titles */}
                {(user.gachaTitles || []).map((t, i) => (
                  <button
                    key={`gacha-${i}`}
                    onClick={() => handleSelectTitle(t)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                      user.activeTitle === t
                        ? "bg-purple-100 text-purple-700 border border-purple-300"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    🎰 {t} {user.activeTitle === t && "✓"}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setActiveTitle(null);
                  setTitlePicker(false);
                  showToast("ลบตำแหน่งแล้ว");
                  onUpdate(getUser());
                }}
                className="w-full mt-3 text-sm text-gray-400 py-2"
              >
                ไม่ใช้ตำแหน่ง
              </button>
            </div>
          </div>
        )}

        {/* Daily Fortune Modal */}
        {dailyFortune && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={() => setDailyFortune(null)}>
            <div className="bg-white rounded-3xl p-6 mx-6 text-center max-w-[320px]" onClick={(e) => e.stopPropagation()}>
              <div className="text-5xl mb-3">🔮</div>
              <p className="text-xs text-gray-400 mb-2">ดวงวันนี้ของคุณ</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{dailyFortune.text}</p>
              <button
                onClick={() => setDailyFortune(null)}
                className="bg-purple-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl active:scale-95"
              >
                รับทราบ
              </button>
            </div>
          </div>
        )}

        {/* Lucky Stone Modal */}
        {luckyStone && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={() => setLuckyStone(null)}>
            <div className="bg-white rounded-3xl p-6 mx-6 text-center max-w-[320px]" onClick={(e) => e.stopPropagation()}>
              <div className="text-5xl mb-2">{luckyStone.emoji}</div>
              <p className="text-xs text-gray-400 mb-1">หินนำโชควันนี้</p>
              <p className="text-lg font-bold text-gray-800 mb-1">{luckyStone.name}</p>
              <p className="text-sm text-gray-600 mb-4">{luckyStone.meaning}</p>
              <button
                onClick={() => setLuckyStone(null)}
                className="bg-emerald-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl active:scale-95"
              >
                รับทราบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
