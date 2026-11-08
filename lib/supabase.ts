import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedSupabase: SupabaseClient | null = null;

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    if (!cachedSupabase) {
      const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
      const rawKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

      const url = (rawUrl && typeof rawUrl === 'string' && rawUrl.trim() !== '') 
        ? rawUrl 
        : 'https://placeholder.supabase.co';
        
      const key = (rawKey && typeof rawKey === 'string' && rawKey.trim() !== '') 
        ? rawKey 
        : 'placeholder-key';

      cachedSupabase = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
    return (cachedSupabase as any)[prop];
  },
});