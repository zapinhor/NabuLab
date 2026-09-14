import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import {
  hasActivePremium,
  isPremiumFeatureRoute,
  subscriptionFromRow,
} from "@/lib/entitlements";

export async function updateSession(request: NextRequest) {
  const publicPaths = ["/login", "/entrar", "/cadastro", "/auth/confirm"];
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  );

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    if (isPublicPath) return NextResponse.next({ request });
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headersToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headersToSet).forEach(([name, value]) =>
          response.headers.set(name, value),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims?.sub);

  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    const redirectResponse = NextResponse.redirect(loginUrl);
    response.cookies.getAll().forEach((cookie) =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie),
    );
    return redirectResponse;
  }

  if (isAuthenticated && ["/login", "/entrar", "/cadastro"].includes(request.nextUrl.pathname)) {
    const redirectResponse = NextResponse.redirect(new URL("/", request.url));
    response.cookies.getAll().forEach((cookie) =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie),
    );
    return redirectResponse;
  }

  const isPremiumPath = isPremiumFeatureRoute(request.nextUrl.pathname);

  if (isAuthenticated && isPremiumPath) {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end")
      .eq("user_id", String(data?.claims?.sub))
      .maybeSingle();

    if (error) console.error("[entitlements] Não foi possível verificar a assinatura:", error.message);

    if (!hasActivePremium(subscriptionFromRow(subscription))) {
      const profileUrl = new URL("/perfil", request.url);
      profileUrl.searchParams.set("premium", "required");
      profileUrl.searchParams.set("feature", request.nextUrl.pathname.slice(1));
      const redirectResponse = NextResponse.redirect(profileUrl);
      response.cookies.getAll().forEach((cookie) =>
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie),
      );
      return redirectResponse;
    }
  }

  const historyMatch = request.nextUrl.pathname.match(/^\/historico\/([^/]+)$/);
  if (isAuthenticated && historyMatch) {
    const userId = String(data?.claims?.sub);
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end")
      .eq("user_id", userId)
      .maybeSingle();

    if (!hasActivePremium(subscriptionFromRow(subscription))) {
      const { data: recentAttempts, error } = await supabase
        .from("exam_attempts")
        .select("id")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(3);
      const requestedId = decodeURIComponent(historyMatch[1]);

      if (error || !recentAttempts?.some((attempt) => attempt.id === requestedId)) {
        return NextResponse.redirect(new URL("/historico?limit=free", request.url));
      }
    }
  }

  return response;
}
