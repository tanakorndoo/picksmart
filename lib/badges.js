/**
 * Badge definitions — 20 ฉายา
 * Each badge has: key, emoji, name, description, check function
 */

const BADGES = [
  // === จำนวน Quiz ===
  {
    key: "first_quiz",
    emoji: "🔰",
    name: "นักสำรวจมือใหม่",
    description: "ทำ Quiz ครบ 3 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 3,
  },
  {
    key: "3_quizzes",
    emoji: "🌱",
    name: "เริ่มรู้จักตัวเอง",
    description: "ทำ Quiz ครบ 10 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 10,
  },
  {
    key: "5_quizzes",
    emoji: "🏆",
    name: "ผู้เชี่ยวชาญตัวตน",
    description: "ทำ Quiz ครบ 25 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 25,
  },
  {
    key: "10_quizzes",
    emoji: "💎",
    name: "นักค้นหาตัวยง",
    description: "ทำ Quiz ครบ 50 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 50,
  },
  {
    key: "20_quizzes",
    emoji: "👑",
    name: "ราชาแห่งแบบทดสอบ",
    description: "ทำ Quiz ครบ 100 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 100,
  },
  {
    key: "50_quizzes",
    emoji: "🐉",
    name: "ตำนานที่มีชีวิต",
    description: "ทำ Quiz ครบ 200 ครั้ง",
    category: "quiz",
    check: (user) => user.quizzesCompleted >= 200,
  },

  // === Streak ===
  {
    key: "streak_3",
    emoji: "🔥",
    name: "ไฟเริ่มติด",
    description: "Streak 7 วันติด",
    category: "streak",
    check: (user) => user.maxStreak >= 7,
  },
  {
    key: "streak_7",
    emoji: "⚡",
    name: "หยุดไม่ได้แล้ว",
    description: "Streak 14 วันติด",
    category: "streak",
    check: (user) => user.maxStreak >= 14,
  },
  {
    key: "streak_30",
    emoji: "🌟",
    name: "สายแข็ง 30 วัน",
    description: "Streak 30 วันติด",
    category: "streak",
    check: (user) => user.maxStreak >= 30,
  },

  // === แชร์ ===
  {
    key: "share_result",
    emoji: "📢",
    name: "นักแชร์ตัวยง",
    description: "แชร์ผลลัพธ์ครบ 3 ครั้ง",
    category: "social",
    check: (user) => user.shareCount >= 3,
  },
  {
    key: "share_5",
    emoji: "📣",
    name: "ป่าวประกาศ",
    description: "แชร์ผลลัพธ์ครบ 10 ครั้ง",
    category: "social",
    check: (user) => user.shareCount >= 10,
  },

  // === หมวดหมู่ ===
  {
    key: "cat_beauty",
    emoji: "💄",
    name: "สายบิวตี้",
    description: "ทำ Quiz หมวดความสวยครบทุกอัน",
    category: "category",
    check: (user, meta) => {
      const beautyIds = meta?.categoryQuizIds?.beauty || [];
      return beautyIds.length > 0 && beautyIds.every((id) => user.completedQuizIds?.includes(id));
    },
  },
  {
    key: "cat_health",
    emoji: "💪",
    name: "สายสุขภาพ",
    description: "ทำ Quiz หมวดสุขภาพครบทุกอัน",
    category: "category",
    check: (user, meta) => {
      const ids = meta?.categoryQuizIds?.health || [];
      return ids.length > 0 && ids.every((id) => user.completedQuizIds?.includes(id));
    },
  },
  {
    key: "cat_spiritual",
    emoji: "🔮",
    name: "สายมู",
    description: "ทำ Quiz หมวดจิตวิญญาณครบทุกอัน",
    category: "category",
    check: (user, meta) => {
      const ids = meta?.categoryQuizIds?.spiritual || [];
      return ids.length > 0 && ids.every((id) => user.completedQuizIds?.includes(id));
    },
  },
  {
    key: "all_categories",
    emoji: "🦄",
    name: "รอบรู้ทุกศาสตร์",
    description: "ทำ Quiz ครบทุกหมวด อย่างน้อยหมวดละ 1",
    category: "category",
    check: (user, meta) => {
      const cats = meta?.categoryQuizIds || {};
      return Object.values(cats).every((ids) =>
        ids.some((id) => user.completedQuizIds?.includes(id))
      );
    },
  },

  // === พฤติกรรมพิเศษ ===
  {
    key: "speed_runner",
    emoji: "⏱️",
    name: "สายเร็วแรง",
    description: "ทำ Quiz เสร็จภายใน 20 วินาที",
    category: "special",
    check: (user) => user.fastestQuizSec !== undefined && user.fastestQuizSec <= 20,
  },
  {
    key: "night_owl",
    emoji: "🦉",
    name: "นกฮูกราตรี",
    description: "ทำ Quiz ตี 1 - ตี 4",
    category: "special",
    check: (user) => user.playedAtNight === true,
  },
  {
    key: "early_bird",
    emoji: "🐓",
    name: "ตื่นก่อนไก่",
    description: "ทำ Quiz ตี 5 - 6 โมงเช้า",
    category: "special",
    check: (user) => user.playedAtDawn === true,
  },

  // === Coins ===
  {
    key: "coin_500",
    emoji: "💰",
    name: "เศรษฐีเหรียญ",
    description: "สะสมเหรียญครบ 1,000",
    category: "coins",
    check: (user) => user.totalCoinsEarned >= 1000,
  },
  {
    key: "coin_2000",
    emoji: "🏦",
    name: "มหาเศรษฐี",
    description: "สะสมเหรียญครบ 5,000",
    category: "coins",
    check: (user) => user.totalCoinsEarned >= 5000,
  },
];

export default BADGES;

/**
 * Build category -> quiz IDs map from quizzes data
 */
export function buildCategoryQuizIds(quizzes) {
  const map = {};
  quizzes.forEach((q) => {
    const cat = q.metadata?.category || "other";
    if (!map[cat]) map[cat] = [];
    map[cat].push(q.quiz_id);
  });
  return map;
}

/**
 * Check all badges and return newly earned ones
 */
export function checkBadges(user, meta) {
  const newBadges = [];
  BADGES.forEach((badge) => {
    if (!user.badges.includes(badge.key) && badge.check(user, meta)) {
      newBadges.push(badge);
    }
  });
  return newBadges;
}

/**
 * Get badge info by key
 */
export function getBadgeByKey(key) {
  return BADGES.find((b) => b.key === key) || null;
}

/**
 * Get all badges grouped by category
 */
export function getBadgesByCategory() {
  const groups = {};
  BADGES.forEach((b) => {
    if (!groups[b.category]) groups[b.category] = [];
    groups[b.category].push(b);
  });
  return groups;
}
