import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/routing";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const safeNext = safeNextPath(request.nextUrl.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data } = await supabase.auth.getUser();
      await recordAuthenticatedAnalyticsEvent("signup_completed", data.user?.id ?? null);
      const destination = new URL(safeNext, request.url);
      destination.searchParams.set("ga_event", "sign_up");
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(
    new URL("/login?mensagem=Não foi possível confirmar o acesso.", request.url),
  );
}
