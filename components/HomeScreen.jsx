"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import GamificationBar from "./GamificationBar";
import DailyThemeBanner from "./DailyThemeBanner";
import CoinShop from "./CoinShop";
import BadgeShowcase from "./BadgeShowcase";
import AuthModal from "./AuthModal";
import SavedProducts from "./SavedProducts";
import { getUser, setAuthUserId, loadFromSupabase, isLoggedIn, clearAuth, hasCompletedQuiz } from "@/lib/store";
import { getSession, onAuthStateChange, signOut } from "@/lib/supabase";
import { getDailyTheme, formatNumber } from "@/lib/utils";
import { THEMES, FRAMES, DAILY_FORTUNES, LUCKY_STONES } from "@/lib/shopItems";
import { getBadgeByKey } from "@/lib/badges";

const CATEGORIES = {
  beauty: {
    name: "ความสวย & สกินแคร์",
    emoji: "💄",
    gradient: "from-pink-400 to-rose-500",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop&q=80",
  },
  health: {
    name: "สุขภาพ & ฟิตเนส",
    emoji: "💪",
    gradient: "from-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop&q=80",
  },
  spiritual: {
    name: "จิตวิญญาณ & ดวง",
    emoji: "🔮",
    gradient: "from-violet-400 to-purple-600",
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=250&fit=crop&q=80",
  },
  pet: {
    name: "สัตว์เลี้ยง & น้องแมว",
    emoji: "🐱",
    gradient: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=250&fit=crop&q=80",
  },
  travel: {
    name: "ท่องเที่ยว & ไลฟ์สไตล์",
    emoji: "🗺️",
    gradient: "from-teal-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop&q=80",
  },
};

export default function HomeScreen({ quizzes, appSettings }) {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authEmail, setAuthEmail] = useState(null);
  const [dailyFortune, setDailyFortune] = useState(null);
  const [luckyStone, setLuckyStone] = useState(null);
  const [showSavedProducts, setShowSavedProducts] = useState(false);

  function applyThemeFromUser(u) {
    if (u.activeTheme && u.activeTheme !== "default") {
      const theme = THEMES[u.activeTheme];
      if (theme) {
        document.documentElement.style.setProperty("--bg", theme.colors.bg);
        document.documentElement.style.setProperty("--primary", theme.colors.primary);
        document.documentElement.style.setProperty("--text", theme.colors.text);
      }
    }
  }

  useEffect(() => {
    // Check existing session
    async function init() {
      const session = await getSession();
      let u;
      if (session?.user) {
        setAuthUserId(session.user.id);
        setAuthEmail(session.user.email);
        u = await loadFromSupabase(session.user.id);
      }
      if (!u) u = getUser();
      setUser(u);
      applyThemeFromUser(u);
    }
    init();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setAuthUserId(session.user.id);
        setAuthEmail(session.user.email);
        const u = await loadFromSupabase(session.user.id);
        if (u) {
          setUser(u);
          applyThemeFromUser(u);
        }
      }
      if (event === "SIGNED_OUT") {
        clearAuth();
        setAuthEmail(null);
        setUser(getUser());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const theme = getDailyTheme(appSettings?.daily_themes);

  const groupedQuizzes = useMemo(() => {
    const groups = {};
    quizzes.forEach((quiz) => {
      const cat = quiz.metadata.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(quiz);
    });
    return groups;
  }, [quizzes]);

  if (!user) return null;

  // Get frame style
  const frameInfo = FRAMES[user.activeFrame] || FRAMES.none;
  const frameStyle = frameInfo.style !== "none" ? {
    border: frameInfo.style,
    boxShadow: frameInfo.shadow || "none",
    background: frameInfo.gradient || undefined,
  } : {};

  // Get latest 3 badges
  const recentBadges = (user.badges || []).slice(-3).map((key) => getBadgeByKey(key)).filter(Boolean);

  return (
    <div className="min-h-screen bg-bg max-w-md mx-auto">
      <GamificationBar coins={user.coins} streak={user.streak} loggedIn={!!authEmail} />
      <DailyThemeBanner theme={theme} />

      {/* Auth Banner */}
      {!authEmail ? (
        <div className="mx-4 mt-4 mb-3">
          <button
            onClick={() => setShowAuth(true)}
            className="w-full bg-white border-2 border-blue-500 rounded-2xl py-4 px-6 active:scale-[0.97] transition-transform shadow-sm text-center"
          >
            <p className="text-base font-extrabold text-blue-600">เข้าสู่ระบบ</p>
            <p className="text-xs text-blue-400 mt-1">บันทึกความก้าวหน้า & ปลดล็อกฟีเจอร์พิเศษ</p>
          </button>
        </div>
      ) : (
        <div className="mx-4 mt-4 mb-3 bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3">
            {/* Avatar with frame */}
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl shrink-0"
              style={frameStyle}
            >
              😎
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {user.activeTitle && (
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                    {user.activeTitle}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate mt-0.5">{authEmail}</p>
              {/* Badges */}
              <button
                onClick={() => setShowBadges(true)}
                className="flex items-center gap-2 mt-1 active:opacity-70 transition-opacity"
              >
                <span className="text-[10px] text-gray-400 font-medium">เหรียญตรา:</span>
                {recentBadges.length > 0 ? (
                  <>
                    {recentBadges.map((b) => (
                      <span key={b.key} className="text-sm" title={b.name}>{b.emoji}</span>
                    ))}
                    {user.badges.length > 3 && (
                      <span className="text-[10px] text-gray-400">+{user.badges.length - 3}</span>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] text-gray-400">กดดู →</span>
                )}
              </button>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                onClick={() => setShowShop(true)}
                className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
              >
                🛍️ ร้านค้า
              </button>
              <button
                onClick={() => setShowSavedProducts(true)}
                className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
              >
                🔖 บันทึก {(user.savedProducts || []).length > 0 ? `(${user.savedProducts.length})` : ""}
              </button>
            </div>
          </div>
          {/* Logout button */}
          <button
            onClick={async () => {
              await signOut();
              clearAuth();
              window.location.reload();
            }}
            className="w-full mt-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500 font-medium active:scale-[0.97] transition-transform"
          >
            ออกจากระบบ
          </button>
        </div>
      )}

      {/* Guest: no profile card */}

      {/* Stats Grid — only for logged in users */}
      {authEmail && (
        <div className="grid grid-cols-3 gap-2 px-4 mb-4">
          <div className="bg-white rounded-2xl p-2.5 text-center border border-border">
            <p className="text-lg font-bold text-primary">{user.quizzesCompleted}</p>
            <p className="text-[10px] text-muted">Quiz ทำแล้ว</p>
          </div>
          <button
            onClick={() => setShowBadges(true)}
            className="bg-white rounded-2xl p-2.5 text-center border border-border active:scale-95 transition-transform"
          >
            <p className="text-lg font-bold text-purple">{user.badges.length}/20</p>
            <p className="text-[10px] text-muted">เหรียญตรา</p>
          </button>
          <div className="bg-white rounded-2xl p-2.5 text-center border border-border">
            <p className="text-lg font-bold text-accent">{user.streak} วัน</p>
            <p className="text-[10px] text-muted">Streak</p>
          </div>
        </div>
      )}

      {/* Coins Bar — only for logged in users */}
      {authEmail && (
        <div className="mx-4 mb-4">
          <button
            onClick={() => setShowShop(true)}
            className="w-full flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-4 py-2.5 active:scale-[0.97] transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🪙</span>
              <span className="text-sm font-bold text-amber-700">{user.coins} เหรียญ</span>
            </div>
            <span className="text-[11px] text-amber-500 font-medium">แลกของรางวัล →</span>
          </button>
        </div>
      )}

      {/* Unlocked Daily Features — only for logged in users */}
      {authEmail && (user.purchases?.includes("feature_daily_fortune") || user.purchases?.includes("feature_lucky_stone")) && (
        <div className="px-4 mb-4 flex gap-2">
          {user.purchases.includes("feature_daily_fortune") && (
            <button
              onClick={() => {
                const profile = user.profile || {};
                let top = "default", max = 0;
                Object.entries(profile).forEach(([k, v]) => { if (v > max) { max = v; top = k; } });
                const fortunes = DAILY_FORTUNES[top] || DAILY_FORTUNES.default;
                const dayIdx = new Date().getDate() % fortunes.length;
                setDailyFortune({ text: fortunes[dayIdx] });
              }}
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl p-3 text-left active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔮</span>
                <div>
                  <p className="text-xs font-bold">ดวงวันนี้</p>
                  <p className="text-[10px] text-white/70">กดดูเลย</p>
                </div>
              </div>
            </button>
          )}
          {user.purchases.includes("feature_lucky_stone") && (
            <button
              onClick={() => {
                const dayIdx = (new Date().getDate() + new Date().getMonth()) % LUCKY_STONES.length;
                setLuckyStone(LUCKY_STONES[dayIdx]);
              }}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 text-left active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💎</span>
                <div>
                  <p className="text-xs font-bold">หินนำโชค</p>
                  <p className="text-[10px] text-white/70">ประจำวัน</p>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Category Cards */}
      <div className="px-4 pb-8">
        <h2 className="text-base font-bold mb-3">🎯 เลือกหมวด Quiz</h2>

        {!selectedCategory ? (
          <div className="flex flex-col gap-3">
            {Object.entries(groupedQuizzes).map(([catKey, catQuizzes]) => {
              const catInfo = CATEGORIES[catKey] || {
                name: catKey,
                emoji: "📋",
                gradient: "from-gray-400 to-gray-500",
                image: null,
              };
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className="relative overflow-hidden rounded-2xl active:scale-[0.97] transition-transform text-left shadow-sm"
                >
                  <div className="relative h-32">
                    {catInfo.image ? (
                      <img
                        src={catInfo.image}
                        alt={catInfo.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${catInfo.gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-3.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xl">{catInfo.emoji}</span>
                        <h3 className="text-base font-bold text-white drop-shadow-sm">
                          {catInfo.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-white/80">
                          {catQuizzes.length} แบบทดสอบ
                        </p>
                        <span className="text-[11px] text-white/60 flex items-center gap-1">
                          ดูทั้งหมด
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1.5 mb-3 text-sm text-muted active:text-text transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              กลับหน้าหมวด
            </button>

            {(() => {
              const catInfo = CATEGORIES[selectedCategory] || {
                name: selectedCategory,
                emoji: "📋",
                gradient: "from-gray-400 to-gray-500",
                image: null,
              };
              return (
                <div className="relative overflow-hidden rounded-2xl mb-3 h-20 shadow-sm">
                  {catInfo.image ? (
                    <img
                      src={catInfo.image}
                      alt={catInfo.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${catInfo.gradient}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                  <div className="absolute inset-0 flex items-center p-3.5">
                    <span className="text-2xl mr-2.5">{catInfo.emoji}</span>
                    <div>
                      <h3 className="text-base font-bold text-white drop-shadow-sm">{catInfo.name}</h3>
                      <p className="text-[11px] text-white/80">
                        {groupedQuizzes[selectedCategory]?.length || 0} แบบทดสอบ
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex flex-col gap-2.5">
              {(groupedQuizzes[selectedCategory] || []).map((quiz) => {
                const done = hasCompletedQuiz(quiz.quiz_id);
                return (
                  <Link key={quiz.quiz_id} href={`/quiz/${quiz.quiz_id}`}>
                    <div className={`rounded-2xl p-3.5 border active:scale-[0.97] transition-transform cursor-pointer shadow-sm ${
                      done
                        ? "bg-primary-light border-primary/30"
                        : "bg-white border-border"
                    }`}>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-2xl">{quiz.metadata.cover_emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-bold text-text leading-tight line-clamp-2">
                            {quiz.metadata.title}
                          </h3>
                        </div>
                        {done ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full whitespace-nowrap shrink-0">
                            ✅ ทำแล้ว
                          </span>
                        ) : quiz.metadata.trending_badge ? (
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-accent-light text-accent rounded-full whitespace-nowrap shrink-0">
                            {quiz.metadata.trending_badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-muted mb-2 line-clamp-1 pl-9">
                        {quiz.metadata.subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted pl-9">
                        <span>⏱ {quiz.metadata.estimated_time}</span>
                        <span>👥 {formatNumber(quiz.metadata.total_plays)} คน</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={async (session) => {
            setShowAuth(false);
            setAuthUserId(session.user.id);
            setAuthEmail(session.user.email);
            const u = await loadFromSupabase(session.user.id);
            if (u) {
              setUser(u);
              applyThemeFromUser(u);
            }
          }}
        />
      )}
      {showShop && (
        <CoinShop
          user={user}
          onUpdate={(u) => setUser(u)}
          onClose={() => setShowShop(false)}
        />
      )}
      {showBadges && (
        <BadgeShowcase
          user={user}
          onClose={() => setShowBadges(false)}
        />
      )}
      {showSavedProducts && (
        <SavedProducts
          user={user}
          onUpdate={(u) => setUser(u)}
          onClose={() => setShowSavedProducts(false)}
        />
      )}

      {/* Daily Fortune Modal */}
      {dailyFortune && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDailyFortune(null)}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setLuckyStone(null)}>
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
  );
}
