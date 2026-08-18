import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client. Uses the service role key to bypass RLS for
// build-time and cron data access (e.g. writing daily_prices).
// NEVER import this from a "use client" file — it would leak the key to the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseServerConfigured = Boolean(url && serviceKey);

export const supabaseServer = isSupabaseServerConfigured
  ? createClient(url!, serviceKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
