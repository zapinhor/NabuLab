import { NextResponse, type NextRequest } from "next/server";
import { ATTRIBUTION_COOKIE, ATTRIBUTION_MAX_AGE, parseCampaign } from "@/lib/analytics/acquisition";

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ accepted: false }, { status: 403 });
  let body: { search?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ accepted: false }, { status: 400 }); }
  if (typeof body.search !== "string" || body.search.length > 600) return NextResponse.json({ accepted: false }, { status: 400 });
  const campaign = parseCampaign(new URLSearchParams(body.search));
  if (!campaign) return NextResponse.json({ accepted: false }, { status: 400 });
  const response = NextResponse.json({ accepted: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(ATTRIBUTION_COOKIE, encodeURIComponent(JSON.stringify({ ...campaign, timestamp: Date.now() })), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: ATTRIBUTION_MAX_AGE,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ accepted: false }, { status: 403 });
  const response = NextResponse.json({ accepted: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.delete(ATTRIBUTION_COOKIE);
  return response;
}
