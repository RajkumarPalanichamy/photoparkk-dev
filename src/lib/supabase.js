import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Supabase URL or Key is missing. Check your .env.local file.');
}

// Create a single supabase client for interacting with your database
// We provide fallbacks to avoid the "supabaseUrl is required" fatal crash during dev startup
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder-key',
    {
        db: {
            schema: 'photoparkk'
        }
    }
);
