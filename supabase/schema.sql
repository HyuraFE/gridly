-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'retro-pastel',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Constraint username: lowercase alphanumeric and underscore/dash only, min 3 chars
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS username_format_check;
ALTER TABLE public.profiles ADD CONSTRAINT username_format_check 
  CHECK (username ~ '^[a-z0-9_-]{3,24}$');

-- 2. Table: Bento Cards
CREATE TABLE IF NOT EXISTS public.bento_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('link', 'github', 'discord', 'text', 'spotify')),
  title TEXT NOT NULL,
  content TEXT, -- URL / handle / bio text
  bg_color TEXT DEFAULT '#ffffff', -- Neobrutalist card color
  col_span INT DEFAULT 1 CHECK (col_span IN (1, 2)),
  row_span INT DEFAULT 1 CHECK (row_span IN (1, 2)),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bento_cards ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Bento Cards Policies
DROP POLICY IF EXISTS "Public can view bento cards" ON public.bento_cards;
CREATE POLICY "Public can view bento cards" ON public.bento_cards
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own cards" ON public.bento_cards;
CREATE POLICY "Users can insert own cards" ON public.bento_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cards" ON public.bento_cards;
CREATE POLICY "Users can update own cards" ON public.bento_cards
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cards" ON public.bento_cards;
CREATE POLICY "Users can delete own cards" ON public.bento_cards
  FOR DELETE USING (auth.uid() = user_id);
