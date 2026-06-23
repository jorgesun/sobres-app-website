import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser client. The publishable (anon) key is public — access is protected by
// RLS (§9). The secret key must NEVER ship to the client.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

/** Returns the Supabase client, or null when env is not configured (local-only mode). */
export function supabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
