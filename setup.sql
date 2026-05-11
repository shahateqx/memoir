-- 1. Create the 'pages' table
CREATE TABLE pages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT 'Untitled',
  nodes jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) for the 'pages' table
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for 'pages'
-- Users can only see their own pages
CREATE POLICY "Users can view own pages" 
  ON pages FOR SELECT 
  USING (auth.uid() = created_by);

-- Users can only insert their own pages
CREATE POLICY "Users can insert own pages" 
  ON pages FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Users can only update their own pages
CREATE POLICY "Users can update own pages" 
  ON pages FOR UPDATE 
  USING (auth.uid() = created_by);

-- Users can only delete their own pages
CREATE POLICY "Users can delete own pages" 
  ON pages FOR DELETE 
  USING (auth.uid() = created_by);

-- 4. Set up 'images' storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Create storage policies for 'images' bucket
-- Allow public read access to images
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'images' AND 
    auth.role() = 'authenticated'
  );
