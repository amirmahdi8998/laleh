-- ============================================
-- Supabase setup for Laleh Hotel
-- Run this entire script ONCE in SQL Editor
-- ============================================

-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  code TEXT,
  name TEXT,
  phone TEXT,
  email TEXT,
  checkin TEXT,
  checkout TEXT,
  roomId TEXT,
  room_name TEXT,
  adults INT DEFAULT 2,
  children INT DEFAULT 0,
  nights INT DEFAULT 1,
  extras JSONB DEFAULT '[]',
  extras_title JSONB DEFAULT '[]',
  total BIGINT DEFAULT 0,
  roomName TEXT
);

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT,
  content TEXT,
  image_url TEXT DEFAULT '',
  author TEXT DEFAULT 'مدیر هتل',
  tags JSONB DEFAULT '[]',
  date TEXT
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Allow public access (anon key) to read/write bookings
CREATE POLICY "Allow all on bookings"
  ON bookings FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Allow public access (anon key) to read/write blog_posts
CREATE POLICY "Allow all on blog_posts"
  ON blog_posts FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6. Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Allow public access to storage bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
  ON storage.objects FOR ALL
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');
