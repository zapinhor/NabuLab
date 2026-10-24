import { randomInt } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import {
  GUEST_QUIZ_COOKIE,
  GUEST_QUIZ_COOKIE_MAX_AGE,
  encodeGuestLock,
  findGuestTrack,
  parseGuestLock,
} from "@/lib/content/guest-quiz";

/**
 * Início do teste sem conta. Grava a área escolhida e a semente do sorteio uma
 * única vez; se o navegador já começou um teste, a escolha nova é ignorada e a
 * pessoa volta para as mesmas 3 questões.
 */
export function GET(request: NextRequest) {
  const destination = new URL("/experimente", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== "area") destination.searchParams.set(key, value);
  });
  const response = NextResponse.redirect(destination, 303);

  if (parseGuestLock(request.cookies.get(GUEST_QUIZ_COOKIE)?.value)) return response;

  const track = findGuestTrack(request.nextUrl.searchParams.get("area") ?? undefined);
  if (!track) return response;

  response.cookies.set(GUEST_QUIZ_COOKIE, encodeGuestLock(track.id, randomInt(0, 2 ** 32 - 1)), {
    path: "/",
    maxAge: GUEST_QUIZ_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}
