declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const HOTMART_AUTH_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const HOTMART_SALES_URL = "https://developers.hotmart.com/payments/api/v1/sales/history";
const ALLOWED_PARAMS = new Set([
  "product_id",
  "start_date",
  "end_date",
  "transaction_status",
  "max_results",
  "page_token",
  "offer_code",
  "transaction",
]);
const ALLOWED_OFFERS = new Set(["v4h77zvh", "7mqlgaln"]);

type ProxyBody = { clientId?: unknown; clientSecret?: unknown; basicToken?: unknown; params?: unknown };

function secretKeys() {
  const keys = [Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")];
  try {
    const named = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    if (named && typeof named === "object") keys.push(...Object.values(named).filter((value): value is string => typeof value === "string"));
  } catch {}
  return keys.filter((value): value is string => Boolean(value));
}

function authorized(request: Request) {
  const apiKey = request.headers.get("apikey");
  return Boolean(apiKey && secretKeys().includes(apiKey));
}

function safeParams(input: unknown) {
  if (!Array.isArray(input)) throw new Error("INVALID_PARAMS");
  const params = new URLSearchParams();
  for (const entry of input) {
    if (!Array.isArray(entry) || entry.length !== 2 || typeof entry[0] !== "string" || typeof entry[1] !== "string") throw new Error("INVALID_PARAMS");
    const [name, value] = entry;
    if (!ALLOWED_PARAMS.has(name)) throw new Error("INVALID_PARAM_NAME");
    params.append(name, value);
  }
  const productId = params.get("product_id");
  if (productId && productId !== "8516493") throw new Error("INVALID_PRODUCT");
  const offerCode = params.get("offer_code");
  if (offerCode && !ALLOWED_OFFERS.has(offerCode)) throw new Error("INVALID_OFFER");
  return params;
}

async function hotmartAccessToken(body: ProxyBody): Promise<{ response: Response } | { token: string }> {
  if (typeof body.clientId !== "string" || typeof body.clientSecret !== "string" || typeof body.basicToken !== "string") throw new Error("INVALID_CREDENTIALS");
  const clientId = body.clientId.trim();
  const clientSecret = body.clientSecret.trim();
  const basicToken = body.basicToken.trim();
  if (!clientId || !clientSecret || !basicToken) throw new Error("INVALID_CREDENTIALS");
  const url = new URL(HOTMART_AUTH_URL);
  url.searchParams.set("grant_type", "client_credentials");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  const authorization = /^Basic\s+/i.test(basicToken) ? basicToken : `Basic ${basicToken}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: authorization },
  });
  if (!response.ok) return { response } as const;
  const payload = await response.json();
  if (!payload || typeof payload.access_token !== "string") throw new Error("INVALID_OAUTH_RESPONSE");
  return { token: payload.access_token as string } as const;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return Response.json({ error: "method_not_allowed" }, { status: 405 });
  if (!authorized(request)) return Response.json({ error: "unauthorized" }, { status: 401 });

  try {
    const body = await request.json() as ProxyBody;
    const params = safeParams(body.params);
    const auth = await hotmartAccessToken(body);
    if ("response" in auth) return new Response(await auth.response.arrayBuffer(), { status: auth.response.status, headers: { "Content-Type": auth.response.headers.get("content-type") ?? "application/json" } });
    const url = new URL(HOTMART_SALES_URL);
    url.search = params.toString();
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return new Response(await response.arrayBuffer(), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "application/json",
        ...(response.headers.get("retry-after") ? { "Retry-After": response.headers.get("retry-after")! } : {}),
      },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "proxy_error";
    return Response.json({ error: code }, { status: 400 });
  }
});
