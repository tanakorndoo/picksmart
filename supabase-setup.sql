-- ========================================
-- PickSmart: สร้างตาราง user_profiles + RLS
-- วิธีใช้: Copy ทั้งหมดไปวางใน Supabase Dashboard → SQL Editor → Run
-- ========================================

-- 1. สร้างตาราง user_profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  coins INTEGER DEFAULT 0,
  total_coins_earned INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  last_play_date TEXT,
  quizzes_completed INTEGER DEFAULT 0,
  completed_quiz_ids JSONB DEFAULT '[]'::jsonb,
  badges JSONB DEFAULT '[]'::jsonb,
  share_count INTEGER DEFAULT 0,
  fastest_quiz_sec NUMERIC,
  played_at_night BOOLEAN DEFAULT false,
  played_at_dawn BOOLEAN DEFAULT false,
  purchases JSONB DEFAULT '[]'::jsonb,
  active_theme TEXT DEFAULT 'default',
  active_frame TEXT DEFAULT 'none',
  active_title TEXT,
  gacha_titles JSONB DEFAULT '[]'::jsonb,
  profile JSONB DEFAULT '{}'::jsonb,
  results JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. เปิด RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. ลบ Policy เดิม (ถ้ามี) แล้วสร้างใหม่
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. Auto-create profile เมื่อ user สมัครใหม่
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger: เรียก function เมื่อมี user ใหม่
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- เสร็จแล้ว! ตรวจสอบได้ที่ Table Editor → user_profiles
-- ========================================
