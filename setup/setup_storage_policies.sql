-- Run this script in the Supabase SQL Editor to fix the Storage RLS error

-- Create Storage Policies for 'photos' bucket
-- Allow public access to read files
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

-- Allow authenticated users (and anon for dev, adjust later) to insert files
DROP POLICY IF EXISTS "Insert Access" ON storage.objects;
CREATE POLICY "Insert Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'photos');

-- Allow authenticated users (and anon for dev, adjust later) to update/delete files
DROP POLICY IF EXISTS "Update Access" ON storage.objects;
CREATE POLICY "Update Access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Delete Access" ON storage.objects;
CREATE POLICY "Delete Access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'photos');
