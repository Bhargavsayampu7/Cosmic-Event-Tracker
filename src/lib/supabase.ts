import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supabase = createClient(supabaseUrl || "", supabaseAnon || "");

export function hasSupabaseEnv(): boolean {
	return Boolean(supabaseUrl && supabaseAnon);
}
