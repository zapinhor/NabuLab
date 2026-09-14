import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeBillingEmail } from "@/lib/billing/hotmart";

export async function prepareBillingIdentity(userId: string, email: string): Promise<void> {
  const normalizedEmail = normalizeBillingEmail(email);
  if (!normalizedEmail.includes("@")) throw new Error("BILLING_EMAIL_INVALID");

  const admin = createAdminClient();
  const { error } = await admin.from("billing_customers").upsert(
    {
      user_id: userId,
      normalized_email: normalizedEmail,
      provider: "hotmart",
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}
