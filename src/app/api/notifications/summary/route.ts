import { getNotificationSummary } from "@/lib/notifications-server";

export async function GET() {
  const { user, unread, items } = await getNotificationSummary();
  if (!user) return Response.json({ error: "Sessão necessária." }, { status: 401 });
  return Response.json({ unread, items }, { headers: { "cache-control": "private, no-store" } });
}
