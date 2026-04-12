/**
 * Get today's daily theme
 */
export function getDailyTheme(dailyThemes) {
  if (!dailyThemes) return null;
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = days[new Date().getDay()];
  return dailyThemes[today] || null;
}

/**
 * Format number with commas (Thai style)
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Share using Web Share API with clipboard fallback
 */
export async function shareResult(text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ text, url });
      return true;
    } catch {
      // User cancelled or error
    }
  }

  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return "copied";
  } catch {
    return false;
  }
}

/**
 * Get badge info from gamification config
 */
export function getBadgeInfo(badgeKey, gamification) {
  const allBadges = gamification?.badges || {};
  return allBadges[badgeKey] || null;
}
