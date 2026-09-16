import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";

export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secretKey) {
    throw new Error("Chave administrativa do Supabase não configurada no servidor (SUPABASE_SECRET_KEY ou fallback SUPABASE_SERVICE_ROLE_KEY).");
  }

  return createClient(getSupabaseConfig().url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
