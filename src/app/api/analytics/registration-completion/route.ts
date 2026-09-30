import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  REGISTRATION_COMPLETION_COOKIE,
  REGISTRATION_COMPLETION_COOKIE_OPTIONS,
} from "@/lib/analytics/registration-completion";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const cookieStore = await cookies();
  if (cookieStore.get(REGISTRATION_COMPLETION_COOKIE)?.value !== "1") {
    return NextResponse.json({ shouldTrack: false }, { headers: { "Cache-Control": "no-store" } });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ shouldTrack: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const response = NextResponse.json(
    { shouldTrack: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(REGISTRATION_COMPLETION_COOKIE, "", {
    ...REGISTRATION_COMPLETION_COOKIE_OPTIONS,
    maxAge: 0,
  });
  return response;
}
