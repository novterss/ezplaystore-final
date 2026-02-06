import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables. Check your .env file or Vercel Settings.');
}

// Proceed with empty strings if missing (it will fail on requests but won't crash app startup)
export const supabase = createClient(supabaseUrl, supabaseKey);
