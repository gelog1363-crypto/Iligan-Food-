-- migrations/001_create_user_profiles.sql
-- Run this in your Supabase SQL editor or psql against your DB

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid NOT NULL,
  full_name text NOT NULL,
  phone text NULL,
  address text NULL,
  barangay text NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id)
) TABLESPACE pg_default;

-- index for faster lookups by created_at and barangay
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles USING btree (created_at desc);
CREATE INDEX IF NOT EXISTS idx_user_profiles_barangay ON public.user_profiles USING btree (barangay);

-- optional trigger to keep updated_at in sync (requires function update_updated_at_column to exist)
-- If you already have a helper function named update_updated_at_column(), uncomment the trigger below
-- CREATE TRIGGER update_user_profiles_updated_at
-- BEFORE UPDATE ON user_profiles FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();

-- Notes:
-- 1) This table uses the same UUID as the corresponding row in auth.users (id). That simplifies joins and lookups.
-- 2) To insert/update a profile for a signed-in user, simply upsert into user_profiles with id = auth.user().id
-- Example upsert using Supabase client:
-- await supabase.from('user_profiles').upsert({ id: user.id, full_name: 'Juan Dela Cruz', phone: '09171234567', address: 'Blk 2 Lot 3', barangay: 'Poblacion' });
