-- เพิ่มคอลัมน์ saved_products ในตาราง user_profiles
-- Copy ไปวางใน Supabase Dashboard → SQL Editor → Run

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS saved_products JSONB DEFAULT '[]'::jsonb;
