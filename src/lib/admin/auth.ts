import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PlatformAdminRole = "admin" | "super_admin";

export async function requirePlatformAdmin(options: { superAdmin?: boolean; aal2?: boolean; returnTo?: string } = {}) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?next=%2Fadmin");
  const { data: admin } = await supabase.from("platform_admins")
    .select("user_id,role,mfa_required").eq("user_id", userData.user.id).maybeSingle();
  if (!admin) redirect("/dashboard");
  if (options.superAdmin && admin.role !== "super_admin") redirect("/admin?access=super_admin");
  if (options.aal2 && admin.role === "super_admin") {
    const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (process.env.NODE_ENV === "development") {
      console.info("[admin-auth] server authorization", {
        userPresent: true,
        userIdPrefix: userData.user.id.slice(0, 8),
        role: admin.role,
        currentLevel: assurance?.currentLevel ?? null,
        nextLevel: assurance?.nextLevel ?? null,
      });
    }
    if (assurance?.currentLevel !== "aal2") {
      redirect(`/admin/mfa?returnTo=${encodeURIComponent(options.returnTo ?? "/admin")}`);
    }
  }
  return { user: userData.user, role: admin.role as PlatformAdminRole, supabase };
}

export async function recordAdminAudit(actorUserId: string, action: string, metadata: Record<string, unknown> = {}) {
  const { createAdminClient } = await import("@/lib/supabase/admin");
  await createAdminClient().from("audit_events").insert({
    actor_user_id: actorUserId, action, entity_type: "platform_security", metadata,
  });
}
