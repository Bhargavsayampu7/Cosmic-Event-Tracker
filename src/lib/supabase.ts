import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnon 
    ? createClient(supabaseUrl, supabaseAnon)
    : null;

export function hasSupabaseEnv(): boolean {
  return Boolean(supabaseUrl && supabaseAnon);
}
