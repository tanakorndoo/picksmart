import { checkBadges, buildCategoryQuizIds } from "./badges";
import { fetchProfile, updateProfile, getSession } from "./supabase";

const STORAGE_KEY = "picksmart_user";

const defaultUser = {
  coins: 0,
  totalCoinsEarned: 0,
  streak: 0,
  maxStreak: 0,
  lastPlayDate: null,
  quizzesCompleted: 0,
  completedQuizIds: [],
  badges: [],
  results: [],
  profile: {},
  shareCount: 0,
  fastestQuizSec: undefined,
  playedAtNight: false,
  playedAtDawn: false,
  purchases: [],
  activeTheme: "default",
  activeFrame: "none",
  activeTitle: null,
  gachaTitles: [],
  lastFortuneDate: null,
  lastLuckyStoneDate: null,
};

// ======== localStorage (guest / cache) ========

function getLocal() {
  if (typeof window === "undefined") return { ...defaultUser };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { ...defaultUser };
    return { ...defaultUser, ...JSON.parse(data) };
  } catch {
    return { ...defaultUser };
  }
}

function saveLocal(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

// ======== Supabase DB field mapping ========

function dbToLocal(row) {
  if (!row) return { ...defaultUser };
  return {
    ...defaultUser,
    coins: row.coins ?? 0,
    totalCoinsEarned: row.total_coins_earned ?? 0,
    streak: row.streak ?? 0,
    maxStreak: row.max_streak ?? 0,
    lastPlayDate: row.last_play_date ?? null,
    quizzesCompleted: row.quizzes_completed ?? 0,
    completedQuizIds: row.completed_quiz_ids ?? [],
    badges: row.badges ?? [],
    shareCount: row.share_count ?? 0,
    fastestQuizSec: row.fastest_quiz_sec ?? undefined,
    playedAtNight: row.played_at_night ?? false,
    playedAtDawn: row.played_at_dawn ?? false,
    purchases: row.purchases ?? [],
    activeTheme: row.active_theme ?? "default",
    activeFrame: row.active_frame ?? "none",
    activeTitle: row.active_title ?? null,
    gachaTitles: row.gacha_titles ?? [],
    profile: row.profile ?? {},
    results: row.results ?? [],
    // extra
    displayName: row.display_name ?? null,
    supabaseId: row.id,
  };
}

function localToDb(user) {
  return {
    coins: user.coins,
    total_coins_earned: user.totalCoinsEarned,
    streak: user.streak,
    max_streak: user.maxStreak,
    last_play_date: user.lastPlayDate,
    quizzes_completed: user.quizzesCompleted,
    completed_quiz_ids: user.completedQuizIds || [],
    badges: user.badges || [],
    share_count: user.shareCount || 0,
    fastest_quiz_sec: user.fastestQuizSec ?? null,
    played_at_night: user.playedAtNight || false,
    played_at_dawn: user.playedAtDawn || false,
    purchases: user.purchases || [],
    active_theme: user.activeTheme || "default",
    active_frame: user.activeFrame || "none",
    active_title: user.activeTitle || null,
    gacha_titles: user.gachaTitles || [],
    profile: user.profile || {},
    results: user.results || [],
  };
}

// ======== Merge: รวมข้อมูล local เข้า cloud (เมื่อ login ครั้งแรก) ========

function mergeLocalToCloud(local, cloud) {
  return {
    coins: Math.max(local.coins, cloud.coins),
    totalCoinsEarned: Math.max(local.totalCoinsEarned, cloud.totalCoinsEarned),
    streak: Math.max(local.streak, cloud.streak),
    maxStreak: Math.max(local.maxStreak, cloud.maxStreak),
    lastPlayDate: local.lastPlayDate && cloud.lastPlayDate
      ? (local.lastPlayDate > cloud.lastPlayDate ? local.lastPlayDate : cloud.lastPlayDate)
      : local.lastPlayDate || cloud.lastPlayDate,
    quizzesCompleted: Math.max(local.quizzesCompleted, cloud.quizzesCompleted),
    completedQuizIds: [...new Set([...(local.completedQuizIds || []), ...(cloud.completedQuizIds || [])])],
    badges: [...new Set([...(local.badges || []), ...(cloud.badges || [])])],
    shareCount: Math.max(local.shareCount || 0, cloud.shareCount || 0),
    fastestQuizSec: (local.fastestQuizSec !== undefined && cloud.fastestQuizSec !== undefined)
      ? Math.min(local.fastestQuizSec, cloud.fastestQuizSec)
      : local.fastestQuizSec ?? cloud.fastestQuizSec,
    playedAtNight: local.playedAtNight || cloud.playedAtNight,
    playedAtDawn: local.playedAtDawn || cloud.playedAtDawn,
    purchases: [...new Set([...(local.purchases || []), ...(cloud.purchases || [])])],
    activeTheme: cloud.activeTheme !== "default" ? cloud.activeTheme : local.activeTheme,
    activeFrame: cloud.activeFrame !== "none" ? cloud.activeFrame : local.activeFrame,
    activeTitle: cloud.activeTitle || local.activeTitle,
    gachaTitles: [...new Set([...(local.gachaTitles || []), ...(cloud.gachaTitles || [])])],
    profile: { ...local.profile, ...cloud.profile },
    results: cloud.results?.length >= local.results?.length ? cloud.results : local.results,
  };
}

// ======== Public API ========

let _authUserId = null;

export function setAuthUserId(id) {
  _authUserId = id;
}

export function getAuthUserId() {
  return _authUserId;
}

export function isLoggedIn() {
  return !!_authUserId;
}

/**
 * Get user — always returns from localStorage (cache)
 * For Supabase users, localStorage is kept in sync
 */
export function getUser() {
  return getLocal();
}

export function saveUser(user) {
  saveLocal(user);
  // async push to Supabase (fire-and-forget)
  if (_authUserId) {
    updateProfile(_authUserId, localToDb(user)).catch(() => {});
  }
}

/**
 * Load profile from Supabase and cache to localStorage
 */
export async function loadFromSupabase(userId) {
  const { data, error } = await fetchProfile(userId);
  if (error || !data) return null;

  const cloudUser = dbToLocal(data);
  const localUser = getLocal();

  // If local has data (guest played before login), merge
  let merged = cloudUser;
  if (localUser.quizzesCompleted > 0 && cloudUser.quizzesCompleted === 0) {
    // First login — local has data, cloud is empty → push local up
    merged = { ...localUser, supabaseId: userId, displayName: cloudUser.displayName };
    await updateProfile(userId, localToDb(merged));
  } else if (localUser.quizzesCompleted > 0 && cloudUser.quizzesCompleted > 0) {
    // Both have data — merge
    merged = { ...mergeLocalToCloud(localUser, cloudUser), supabaseId: userId, displayName: cloudUser.displayName };
    await updateProfile(userId, localToDb(merged));
  }

  saveLocal(merged);
  return merged;
}

/**
 * Clear auth state (on logout)
 */
export function clearAuth() {
  _authUserId = null;
  // Keep localStorage data so guest can still play
}

function addCoinsInternal(user, amount) {
  user.coins += amount;
  user.totalCoinsEarned += amount;
}

// ======== Game Logic (unchanged, auto-syncs via saveUser) ========

export function recordQuizResult(quizId, resultKey, label, breakdown, options = {}) {
  const user = getUser();
  const logged = isLoggedIn();

  user.results.push({
    quizId,
    resultKey,
    resultLabel: label,
    breakdown,
    date: new Date().toISOString().split("T")[0],
  });

  // Guest: เก็บผลลัพธ์อย่างเดียว ไม่ได้เหรียญ/streak/badge
  if (!logged) {
    saveUser(user);
    return { user, newBadges: [] };
  }

  // Logged in: ได้เหรียญ + streak + badge ครบ
  if (!user.completedQuizIds) user.completedQuizIds = [];
  if (!user.completedQuizIds.includes(quizId)) {
    user.completedQuizIds.push(quizId);
  }

  user.quizzesCompleted += 1;
  addCoinsInternal(user, 10);

  Object.entries(breakdown).forEach(([key, value]) => {
    user.profile[key] = (user.profile[key] || 0) + value;
  });

  if (options.durationSec !== undefined) {
    if (user.fastestQuizSec === undefined || options.durationSec < user.fastestQuizSec) {
      user.fastestQuizSec = options.durationSec;
    }
  }

  const hour = new Date().getHours();
  if (hour >= 1 && hour < 4) user.playedAtNight = true;
  if (hour >= 5 && hour < 6) user.playedAtDawn = true;

  const today = new Date().toISOString().split("T")[0];
  if (user.lastPlayDate) {
    const lastDate = new Date(user.lastPlayDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) user.streak += 1;
    else if (diffDays > 1) user.streak = 1;
  } else {
    user.streak = 1;
  }
  user.lastPlayDate = today;

  if (!user.maxStreak) user.maxStreak = 0;
  if (user.streak > user.maxStreak) user.maxStreak = user.streak;

  const bonus = getStreakBonus(user.streak);
  if (bonus > 0) addCoinsInternal(user, bonus);

  const meta = options.quizzes
    ? { categoryQuizIds: buildCategoryQuizIds(options.quizzes) }
    : {};
  const newBadges = checkBadges(user, meta);
  newBadges.forEach((b) => user.badges.push(b.key));

  saveUser(user);
  return { user, newBadges };
}

export function recordShare() {
  const user = getUser();

  // Guest: ไม่ได้เหรียญจากการแชร์
  if (isLoggedIn()) {
    addCoinsInternal(user, 5);
  }

  if (!user.shareCount) user.shareCount = 0;
  user.shareCount += 1;

  const newBadges = isLoggedIn() ? checkBadges(user, {}) : [];
  newBadges.forEach((b) => user.badges.push(b.key));

  saveUser(user);
  return { user, newBadges };
}

export function getStreakBonus(streak) {
  if (streak === 30) return 1000;
  if (streak === 7) return 200;
  if (streak === 3) return 50;
  return 0;
}

export function hasCompletedQuiz(quizId) {
  const user = getUser();
  return user.results.some((r) => r.quizId === quizId);
}

export function purchaseItem(itemId, price) {
  const user = getUser();
  if (user.coins < price) return { success: false, reason: "coins_not_enough", user };
  if (!user.purchases) user.purchases = [];
  if (user.purchases.includes(itemId)) return { success: false, reason: "already_purchased", user };

  user.coins -= price;
  user.purchases.push(itemId);

  const newBadges = checkBadges(user, {});
  newBadges.forEach((b) => user.badges.push(b.key));

  saveUser(user);
  return { success: true, user, newBadges };
}

export function purchaseConsumable(itemId, price) {
  const user = getUser();
  if (user.coins < price) return { success: false, reason: "coins_not_enough", user };
  user.coins -= price;
  saveUser(user);
  return { success: true, user };
}

export function setActiveTheme(themeKey) {
  const user = getUser();
  user.activeTheme = themeKey;
  saveUser(user);
  return user;
}

export function setActiveFrame(frameKey) {
  const user = getUser();
  user.activeFrame = frameKey;
  saveUser(user);
  return user;
}

export function setActiveTitle(title) {
  const user = getUser();
  user.activeTitle = title;
  saveUser(user);
  return user;
}

export function addGachaTitle(title) {
  const user = getUser();
  if (!user.gachaTitles) user.gachaTitles = [];
  user.gachaTitles.push(title);
  saveUser(user);
  return user;
}

export function hasPurchased(itemId) {
  const user = getUser();
  return user.purchases?.includes(itemId) || false;
}

export function addCoins(amount) {
  const user = getUser();
  addCoinsInternal(user, amount);
  saveUser(user);
  return user;
}
