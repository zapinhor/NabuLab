import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { safeNextPath } from "@/lib/routing";
import { optionalCaptchaToken } from "@/lib/security/captcha";
import { clearLoginFailures, getLoginLimit, loginBucket, recordLoginFailure, trustedRequestOrigin } from "@/lib/security/auth-rate-limit";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const INVALID = "E-mail ou senha inválidos.";
const LIMITED = "Muitas tentativas de acesso. Aguarde alguns minutos antes de tentar novamente.";

async function auditAdminLogin(email: string, action: "admin_login" | "failed_admin_login" | "admin_rate_limited", actorUserId?: string) {
  const admin = createAdminClient();
  let isAdmin = Boolean(actorUserId);
  if (!isAdmin) {
    const { data: profile } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
    if (profile?.id) {
      const { data: role } = await admin.from("platform_admins").select("user_id").eq("user_id", profile.id).maybeSingle();
      isAdmin = Boolean(role);
    }
  }
  if (isAdmin) await admin.from("audit_events").insert({ actor_user_id: actorUserId ?? null, action, entity_type: "platform_auth", metadata: {} });
}

export async function POST(request: Request) {
  let body: { email?: string; password?: string; next?: string; captchaToken?: string };
  try { body = await request.json(); } catch { return Response.json({ error: INVALID }, { status: 400 }); }
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  if (!email || !password) return Response.json({ error: INVALID }, { status: 400 });

  const bucket = loginBucket(email, trustedRequestOrigin(request.headers));
  const current = await getLoginLimit(bucket);
  if (current.blocked) {
    await auditAdminLogin(email, "admin_rate_limited");
    return Response.json({ error: LIMITED }, { status: 429, headers: { "Retry-After": String(Math.max(1, current.retryAfterSeconds)) } });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password, options: { captchaToken: optionalCaptchaToken(body.captchaToken) },
  });
  if (error || !data.session || !data.user) {
    await recordLoginFailure(bucket);
    await auditAdminLogin(email, "failed_admin_login");
    return Response.json({ error: INVALID }, { status: 401 });
  }
  await clearLoginFailures(bucket);
  await auditAdminLogin(email, "admin_login", data.user.id);
  await recordAuthenticatedAnalyticsEvent("login_completed", data.user.id);
  return Response.json({ redirectTo: safeNextPath(body.next) });
}
