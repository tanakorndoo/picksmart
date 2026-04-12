/**
 * Coin Shop items — 12 รายการแลก
 * type: "theme" | "frame" | "title" | "feature" | "shareCard" | "gacha" | "consumable"
 */

export const THEMES = {
  default: { name: "ค่าเริ่มต้น", colors: { bg: "#FFF8F0", primary: "#FF6B35", text: "#1A1A2E" } },
  pink: { name: "ชมพูหวาน", colors: { bg: "#FFF0F5", primary: "#E91E8C", text: "#2D1B33" } },
  purple_moo: { name: "ม่วงมู", colors: { bg: "#F3E8FF", primary: "#7C3AED", text: "#1E1333" } },
  mint: { name: "มิ้นท์เย็น", colors: { bg: "#ECFDF5", primary: "#059669", text: "#1A2E28" } },
  gold: { name: "ทองอร่าม", colors: { bg: "#FFFBEB", primary: "#D97706", text: "#2E2009" } },
  midnight: { name: "มิดไนท์", colors: { bg: "#1E1B2E", primary: "#A78BFA", text: "#E8E0FF" } },
};

export const FRAMES = {
  none: { name: "ไม่มีกรอบ", style: "none" },
  gold_ring: { name: "กรอบทอง", style: "3px solid #D4A017", shadow: "0 0 8px rgba(212,160,23,0.4)" },
  diamond: { name: "กรอบเพชร", style: "3px solid #00BCD4", shadow: "0 0 10px rgba(0,188,212,0.5)" },
  fire: { name: "กรอบไฟ", style: "3px solid #FF5722", shadow: "0 0 12px rgba(255,87,34,0.5)" },
  rainbow: { name: "กรอบรุ้ง", style: "3px solid transparent", gradient: "linear-gradient(135deg, #FF6B6B, #FFE66D, #4ECDC4, #A78BFA)" },
};

export const TITLES = [
  "เซียน", "แม่มด", "กูรูบิวตี้", "จอมขมังเวทย์",
  "นักรบคริสตัล", "สายมูมือโปร", "เทพแห่งดวง", "ราชินีสกินแคร์",
  "หมอดูดิจิทัล", "โค้ชสุขภาพ",
];

export const GACHA_TITLES = [
  "มนุษย์เซรั่ม", "สายมูติดจรวด", "เด็กวัดไซเบอร์", "นักดมเทียนหอม",
  "โยคะในใจ", "คนนอนดึกเพื่อดวง", "เจ้าแม่รีวิว", "ยิปซีดิจิทัล",
  "นักสะสมหิน", "แม่เหล็กดูดโชค", "สายชิลไม่ชิลล์", "คนรักษ์โลกรักษ์ผิว",
  "พ่อมดแห่งไพไรต์", "นักล่าส่วนลด", "จิตแพทย์กูเกิล", "สาวออฟฟิศสายมู",
];

export const LUCKY_STONES = [
  { name: "โรสควอตซ์", emoji: "🩷", meaning: "เสริมความรัก เมตตามหานิยม", element: "water" },
  { name: "อเมทิสต์", emoji: "💜", meaning: "สมาธิดี ป้องกันพลังลบ", element: "wind" },
  { name: "ไพไรต์", emoji: "✨", meaning: "ดึงดูดเงินทอง โชคลาภ", element: "gold" },
  { name: "โกเมน", emoji: "❤️", meaning: "เสริมพลังชีวิต ความกล้าหาญ", element: "fire" },
  { name: "หยก", emoji: "💚", meaning: "ความอุดมสมบูรณ์ สุขภาพดี", element: "earth" },
  { name: "ลาบราดอไรต์", emoji: "🔮", meaning: "เปิดจิต ญาณทัศนะ", element: "wind" },
  { name: "ซิทริน", emoji: "💛", meaning: "ความสุข พลังบวก เรียกทรัพย์", element: "gold" },
  { name: "ลาริมาร์", emoji: "💙", meaning: "สงบใจ เสริมเสน่ห์", element: "water" },
  { name: "ทับทิม", emoji: "🔴", meaning: "ราชินีแห่งหิน พลังใจ", element: "fire" },
  { name: "ออบซิเดียน", emoji: "🖤", meaning: "ปกป้องคุ้มครอง ตัดพลังลบ", element: "earth" },
  { name: "มูนสโตน", emoji: "🤍", meaning: "สัญชาตญาณ พลังจันทร์", element: "water" },
  { name: "คาร์เนเลียน", emoji: "🧡", meaning: "ความคิดสร้างสรรค์ กล้าแสดงออก", element: "fire" },
];

export const DAILY_FORTUNES = {
  fire: [
    "วันนี้พลังไฟของคุณลุกโชน! เหมาะกับการเริ่มต้นสิ่งใหม่ๆ",
    "ระวังใช้พลังงานเยอะเกินไป พักบ้างนะ",
    "วันนี้มีคนมาขอความช่วยเหลือ ช่วยเขาแล้วจะได้โชคกลับมา",
    "จับหินโกเมนก่อนออกจากบ้าน จะช่วยเสริมพลังให้วันนี้ราบรื่น",
    "ช่วงบ่ายเป็นเวลาทองของคุณ เหมาะตัดสินใจเรื่องสำคัญ",
  ],
  water: [
    "วันนี้อารมณ์อ่อนไหวกว่าปกติ ดูแลใจตัวเองด้วยนะ",
    "ความสัมพันธ์จะดีขึ้นถ้าพูดความรู้สึกออกมาตรงๆ",
    "วันนี้เหมาะกับการพักผ่อน ชาร์จพลังด้วยน้ำ",
    "สวมอเมทิสต์วันนี้ จะช่วยป้องกันการรับพลังลบจากคนรอบข้าง",
    "เชื่อสัญชาตญาณตัวเองวันนี้ มันแม่นกว่าที่คิด",
  ],
  earth: [
    "วันนี้ความอดทนของคุณจะถูกทดสอบ แต่คุณผ่านได้แน่นอน",
    "เรื่องเงินมีข่าวดี! ระวังรายจ่ายไม่จำเป็นก็พอ",
    "วันนี้เหมาะกับการวางแผนระยะยาว สมองคุณคิดได้ชัดมาก",
    "วางหยกบนโต๊ะทำงานวันนี้ จะช่วยเสริมสมาธิและดวงการเงิน",
    "ใครมาปรึกษาวันนี้ ให้ฟังมากกว่าพูด จะได้ใจเขาไป",
  ],
  wind: [
    "วันนี้จินตนาการพุ่งสุดๆ! จดไอเดียทุกอย่างที่ผุดมา",
    "อย่ากลัวที่จะเป็นตัวเอง วันนี้คนรอบข้างจะชื่นชมความแปลก",
    "ฝันเมื่อคืนอาจจะมีนัยสำคัญ ลองตีความดู",
    "ถือลาบราดอไรต์วันนี้ จะช่วยให้ตัดสินใจเรื่องยากได้ง่ายขึ้น",
    "ช่วงเย็นเหมาะกับการทำสมาธิ จะช่วยรีเซ็ตพลังงาน",
  ],
  gold: [
    "วันนี้แม่เหล็กดูดทรัพย์ทำงานเต็มที่! เปิดรับโอกาสใหม่ๆ",
    "มีคนจะเสนอสิ่งดีๆ ให้คุณ อย่าปฏิเสธเร็วเกินไป",
    "วันนี้เหมาะกับการเจรจาต่อรอง คุณมีพลังชักจูงสูง",
    "ตั้งไพไรต์หันหน้าเข้าประตูบ้าน จะช่วยดึงดูดโชคลาภเข้ามา",
    "ก่อนนอน จดเป้าหมายพรุ่งนี้ 3 ข้อ ยิ่งชัดเจน ยิ่งดึงดูดสำเร็จ",
  ],
  default: [
    "วันนี้เป็นวันที่ดีสำหรับการเริ่มต้นใหม่!",
    "เชื่อในตัวเอง คุณทำได้มากกว่าที่คิด",
    "พลังงานดีๆ กำลังมาหาคุณ เปิดใจรับสิ่งใหม่",
    "วันนี้เหมาะกับการดูแลตัวเอง ทั้งกายและใจ",
    "มีเรื่องดีรออยู่ข้างหน้า อดทนอีกนิด!",
  ],
};

const SHOP_ITEMS = [
  // === ปรับแต่งโปรไฟล์ ===
  {
    id: "theme_pink",
    name: "ธีมชมพูหวาน",
    description: "เปลี่ยนสีพื้นหลังเป็นโทนชมพู",
    emoji: "🩷",
    price: 50,
    category: "theme",
    themeKey: "pink",
  },
  {
    id: "theme_purple",
    name: "ธีมม่วงมู",
    description: "เปลี่ยนสีพื้นหลังเป็นโทนม่วงลึกลับ",
    emoji: "💜",
    price: 50,
    category: "theme",
    themeKey: "purple_moo",
  },
  {
    id: "theme_mint",
    name: "ธีมมิ้นท์เย็น",
    description: "เปลี่ยนสีพื้นหลังเป็นโทนเขียวสดชื่น",
    emoji: "🌿",
    price: 50,
    category: "theme",
    themeKey: "mint",
  },
  {
    id: "theme_gold",
    name: "ธีมทองอร่าม",
    description: "เปลี่ยนสีพื้นหลังเป็นโทนทองหรู",
    emoji: "👑",
    price: 80,
    category: "theme",
    themeKey: "gold",
  },
  {
    id: "theme_midnight",
    name: "ธีมมิดไนท์",
    description: "โหมดมืด สวยลึกลับ",
    emoji: "🌙",
    price: 100,
    category: "theme",
    themeKey: "midnight",
  },
  {
    id: "frame_gold",
    name: "กรอบทอง",
    description: "กรอบสีทองรอบ Avatar",
    emoji: "🥇",
    price: 100,
    category: "frame",
    frameKey: "gold_ring",
  },
  {
    id: "frame_diamond",
    name: "กรอบเพชร",
    description: "กรอบเพชรเรืองแสงรอบ Avatar",
    emoji: "💎",
    price: 150,
    category: "frame",
    frameKey: "diamond",
  },
  {
    id: "frame_fire",
    name: "กรอบไฟ",
    description: "กรอบไฟลุกโชนรอบ Avatar",
    emoji: "🔥",
    price: 150,
    category: "frame",
    frameKey: "fire",
  },
  {
    id: "frame_rainbow",
    name: "กรอบรุ้ง",
    description: "กรอบสีรุ้งเปลี่ยนสีรอบ Avatar",
    emoji: "🌈",
    price: 200,
    category: "frame",
    frameKey: "rainbow",
  },
  {
    id: "title_pick",
    name: "เลือกตำแหน่งพิเศษ",
    description: "เลือกคำนำหน้าชื่อ เช่น เซียน, แม่มด, กูรูบิวตี้",
    emoji: "🏷️",
    price: 150,
    category: "title",
  },

  // === ปลดล็อกฟีเจอร์ ===
  {
    id: "feature_daily_fortune",
    name: "ดวงรายวัน",
    description: "ปลดล็อกดูดวงวันนี้ตามธาตุของคุณ (ถาวร)",
    emoji: "🔮",
    price: 80,
    category: "feature",
  },
  {
    id: "feature_lucky_stone",
    name: "สุ่มหินนำโชค",
    description: "สุ่มหินมงคลประจำวัน พร้อมคำแนะนำ (ถาวร)",
    emoji: "💎",
    price: 60,
    category: "feature",
  },

  // === สุ่ม & สนุก ===
  {
    id: "gacha_title",
    name: "กาชาปองฉายา",
    description: "สุ่มฉายาแปลกๆ ติดโปรไฟล์ เช่น มนุษย์เซรั่ม",
    emoji: "🎰",
    price: 30,
    category: "gacha",
    consumable: true,
  },
];

export default SHOP_ITEMS;

/**
 * Get items grouped by category for display
 */
export function getShopByCategory() {
  const categoryLabels = {
    theme: "🎨 ธีมสี",
    frame: "✨ กรอบโปรไฟล์",
    title: "🏷️ ตำแหน่งพิเศษ",
    feature: "🔓 ปลดล็อกฟีเจอร์",
    gacha: "🎰 สุ่ม & สนุก",
  };
  const groups = {};
  SHOP_ITEMS.forEach((item) => {
    const label = categoryLabels[item.category] || item.category;
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });
  return groups;
}
