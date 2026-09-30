import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/routing";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import {
  REGISTRATION_COMPLETION_COOKIE,
  REGISTRATION_COMPLETION_COOKIE_OPTIONS,
} from "@/lib/analytics/registration-completion";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const flow = searchParams.get("flow");
  const safeNext = safeNextPath(searchParams.get("next"));

  const supabase = await createClient();

  // Fluxo atual de confirmação de cadastro via PKCE
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const destination = new URL(safeNext, request.url);

      const isRecovery = type === "recovery" || safeNext === "/redefinir-senha";
      if (!isRecovery && flow === "signup") {
        const { data } = await supabase.auth.getUser();
        await recordAuthenticatedAnalyticsEvent("signup_completed", data.user?.id ?? null);
        destination.searchParams.set("ga_event", "sign_up");
      }

      const response = NextResponse.redirect(destination);
      if (!isRecovery && flow === "signup") {
        response.cookies.set(REGISTRATION_COMPLETION_COOKIE, "1", REGISTRATION_COMPLETION_COOKIE_OPTIONS);
      }
      return response;
    }
  }

  // Fluxo por token hash:
  // recovery, email confirmation, magic link etc.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      const destination = new URL(safeNext, request.url);

      // Recovery não deve ser registrado como novo cadastro.
      if (type === "signup") {
        const { data } = await supabase.auth.getUser();

        await recordAuthenticatedAnalyticsEvent(
          "signup_completed",
          data.user?.id ?? null,
        );

        destination.searchParams.set("ga_event", "sign_up");
      }

      const response = NextResponse.redirect(destination);
      if (type === "signup") {
        response.cookies.set(REGISTRATION_COMPLETION_COOKIE, "1", REGISTRATION_COMPLETION_COOKIE_OPTIONS);
      }
      return response;
    }
  }

  return NextResponse.redirect(
    new URL(
      "/login?mensagem=Não foi possível confirmar o acesso.",
      request.url,
    ),
  );
}
