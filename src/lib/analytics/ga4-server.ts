import "server-only";
import { createHash } from "node:crypto";

export async function sendGa4Purchase(input: { transactionId: string; userId: string; tier: string }) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return { sent: false, reason: "not_configured" as const };
  const clientId = createHash("sha256").update(input.userId).digest("hex").slice(0, 32);
  const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_id: clientId, user_id: input.userId, events: [{ name: "purchase", params: { transaction_id: input.transactionId, currency: "BRL", tier: input.tier } }] }),
  });
  if (!response.ok) throw new Error(`GA4_MEASUREMENT_PROTOCOL_${response.status}`);
  return { sent: true as const };
}
