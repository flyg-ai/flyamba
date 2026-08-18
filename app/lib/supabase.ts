import { createClient } from "@supabase/supabase-js";

// Browser-safe Supabase client (anon key). Used by the AI response caches.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cache reads/writes are an optimization, never a hard dependency — the site
// must keep working with Supabase unconfigured (local dev, preview builds).
// `isSupabaseConfigured` lets callers skip the cache instead of throwing.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
