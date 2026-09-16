import "server-only";

import { createHash } from "node:crypto";
import type { BillingPriceTier } from "@/lib/billing/config";
import { hotmartSalesEpochRange, tierForOffer } from "@/lib/billing/hotmart-api-model";

const AUTH_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const REQUEST_TIMEOUT_MS = 12_000;
const MAX_PAGES = 100;
const SALES_STATUSES = ["APPROVED", "COMPLETE", "CANCELLED", "REFUNDED", "CHARGEBACK"] as const;
export type HotmartApiStep = "configuration" | "oauth" | "sales" | "subscriptions" | "commissions" | "products" | "offers";

type JsonRecord = Record<string, unknown>;
type Money = { value: number; currency: string };
type SalesQueryMode = "bounded" | "start_only" | "unbounded" | "unbounded_default_page" | "product_only";

export type HotmartTransaction = { transaction: string; status: string; date: string; offerCode: string | null; tier: BillingPriceTier | null; gross: Money | null; producerCommission: Money | null; paymentType: string | null };
export type HotmartSubscription = { subscriberCode: string; status: string; offerCode: string | null; tier: BillingPriceTier | null; price: Money | null; accessionDate: string | null; endDate: string | null; nextChargeDate: string | null; cancellationDate: string | null };
export type HotmartDailyPoint = { date: string; transactions: number; gross: number };
export type HotmartFinanceReport = {
  connected: true; from: string; to: string; transactions: HotmartTransaction[]; subscriptions: HotmartSubscription[]; daily: HotmartDailyPoint[];
  gross: Money | null; producerCommission: Money | null; activeSubscriptions: number; founderActive: number; standardActive: number;
  canceledSubscriptions: number; refunds: number; chargebacks: number; mrr: Money | null; mrrFormula: string;
  founderOfferFound: boolean; standardOfferFound: boolean; subscriptionPlansFound: number;
};

export class HotmartApiError extends Error {
  constructor(message: string, public readonly status: number | null, public readonly code: "configuration" | "authentication" | "forbidden" | "rate_limit" | "upstream" | "timeout" | "invalid_response", public readonly retryAfterSeconds: number | null = null, public readonly resource: string | null = null, public readonly step: HotmartApiStep = "configuration", public readonly providerCode: string | null = null, public readonly providerMessage: string | null = null) {
    super(message); this.name = "HotmartApiError";
  }
}

let cachedToken: { value: string; expiresAt: number } | null = null;
function record(value: unknown): JsonRecord { return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {}; }
function array(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function string(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}
function number(value: unknown): number | null { return typeof value === "number" && Number.isFinite(value) ? value : null; }
function at(root: unknown, ...keys: string[]): unknown { let current = root; for (const key of keys) current = record(current)[key]; return current; }
function firstString(root: unknown, paths: string[][]): string | null { for (const path of paths) { const value = string(at(root, ...path)); if (value) return value; } return null; }
function toIso(value: unknown): string | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const numeric = Number(value); const date = Number.isFinite(numeric) ? new Date(numeric < 10_000_000_000 ? numeric * 1000 : numeric) : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
function money(value: unknown): Money | null { const item = record(value); const amount = number(item.value); const currency = string(item.currency_code) ?? string(item.currency); return amount === null || !currency ? null : { value: amount, currency }; }
function credentials() {
  const clientId = process.env.HOTMART_CLIENT_ID?.trim(); const clientSecret = process.env.HOTMART_CLIENT_SECRET?.trim(); const basicToken = process.env.HOTMART_BASIC_TOKEN?.trim(); const productId = process.env.HOTMART_PRODUCT_ID?.trim();
  if (!clientId || !clientSecret || !basicToken || !productId) throw new HotmartApiError("Credenciais da API Hotmart não configuradas no servidor.", null, "configuration", null, null, "configuration");
  return { clientId, clientSecret, basicToken, productId };
}
function credentialSetFingerprint() {
  const values = [process.env.HOTMART_CLIENT_ID, process.env.HOTMART_CLIENT_SECRET, process.env.HOTMART_BASIC_TOKEN, process.env.HOTMART_PRODUCT_ID]
    .map((value) => value?.trim() ?? "");
  return createHash("sha256").update(values.join("\u0000")).digest("hex").slice(0, 12);
}
function networkCode(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const cause = "cause" in error && error.cause && typeof error.cause === "object" ? error.cause : error;
  return "code" in cause && typeof cause.code === "string" ? cause.code : null;
}
async function fetchWithTimeout(url: string, init: RequestInit, step: HotmartApiStep): Promise<Response> {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try { return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" }); }
  catch (error) { if (error instanceof Error && error.name === "AbortError") throw new HotmartApiError("A Hotmart excedeu o tempo limite.", null, "timeout", null, null, step); throw new HotmartApiError("Não foi possível conectar à Hotmart.", null, "upstream", null, null, step, networkCode(error)); }
  finally { clearTimeout(timer); }
}
async function hotmartProxyGet(path: string, params: URLSearchParams, step: HotmartApiStep) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseSecret = (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim();
  if (!supabaseUrl || !supabaseSecret) throw new HotmartApiError("Proxy seguro da Hotmart não configurado.", null, "configuration", null, null, step);
  const config = credentials();
  return fetchWithTimeout(
    `${supabaseUrl}/functions/v1/hotmart-api-proxy`,
    {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", apikey: supabaseSecret },
      body: JSON.stringify({ clientId: config.clientId, clientSecret: config.clientSecret, basicToken: config.basicToken, path, params: [...params.entries()] }),
    },
    step,
  );
}
async function responseError(response: Response, step: HotmartApiStep, resource: string | null = null): Promise<HotmartApiError> {
  const retryAfter = Number(response.headers.get("retry-after") ?? response.headers.get("ratelimit-reset"));
  let providerCode: string | null = null;
  let providerMessage: string | null = null;
  try {
    const payload = record(await response.clone().json());
    providerCode = string(payload.error) ?? string(payload.code) ?? string(payload.status);
    providerMessage = string(payload.error_description) ?? string(payload.message);
  } catch {}
  if (response.status === 401) return new HotmartApiError("A autenticação da Hotmart foi recusada.", 401, "authentication", null, resource, step, providerCode, providerMessage);
  if (response.status === 403) return new HotmartApiError("A credencial não possui acesso a este recurso.", 403, "forbidden", null, resource, step, providerCode, providerMessage);
  if (response.status === 429) return new HotmartApiError("O limite de chamadas da Hotmart foi atingido.", 429, "rate_limit", Number.isFinite(retryAfter) ? retryAfter : null, resource, step, providerCode, providerMessage);
  return new HotmartApiError("A API Hotmart está temporariamente indisponível.", response.status, "upstream", null, resource, step, providerCode, providerMessage);
}
async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const config = credentials(); const url = new URL(AUTH_URL);
  url.searchParams.set("grant_type", "client_credentials"); url.searchParams.set("client_id", config.clientId); url.searchParams.set("client_secret", config.clientSecret);
  const authorization = /^Basic\s+/i.test(config.basicToken) ? config.basicToken : `Basic ${config.basicToken}`;
  const response = await fetchWithTimeout(url.toString(), { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: authorization } }, "oauth");
  if (!response.ok) throw await responseError(response, "oauth", "oauth/token");
  const payload = record(await response.json()); const token = string(payload.access_token); const expiresIn = number(payload.expires_in);
  if (!token || expiresIn === null) throw new HotmartApiError("Resposta de autenticação Hotmart inválida.", response.status, "invalid_response", null, "oauth/token", "oauth");
  cachedToken = { value: token, expiresAt: Date.now() + expiresIn * 1000 }; return token;
}
async function apiGet(path: string, params: URLSearchParams, step: HotmartApiStep): Promise<JsonRecord> {
  let response = await hotmartProxyGet(path, params, step);
  if (response.status === 401) response = await hotmartProxyGet(path, params, step);
  if (!response.ok) {
    if (step === "sales") {
      console.error("[hotmart-api] sales query", {
        parameterNames: [...new Set(params.keys())],
        scope: params.has("product_id") ? "product_id" : params.has("offer_code") ? "offer_code" : "none",
        product_id: params.get("product_id"),
        start_date: params.get("start_date"),
        end_date: params.get("end_date"),
        max_results: params.get("max_results"),
        transactionStatusCount: params.getAll("transaction_status").length,
      });
    }
    throw await responseError(response, step, path);
  }
  try { return record(await response.json()); } catch { throw new HotmartApiError("Resposta JSON da Hotmart inválida.", response.status, "invalid_response", null, path, step); }
}
async function allPages(path: string, baseParams: URLSearchParams, step: HotmartApiStep, salesMode?: SalesQueryMode): Promise<unknown[]> {
  const items: unknown[] = []; let pageToken: string | null = null; const seen = new Set<string>();
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const params = new URLSearchParams(baseParams);
    if (salesMode !== "unbounded_default_page" && salesMode !== "product_only") params.set("max_results", "100");
    if (pageToken) params.set("page_token", pageToken);
    const payload = await apiGet(path, params, step); items.push(...array(payload.items)); const next = string(at(payload, "page_info", "next_page_token"));
    if (!next) {
      if (step === "sales") console.info("[hotmart-api] sales status", { status: baseParams.get("transaction_status"), mode: salesMode ?? "bounded", httpStatus: 200, pages: page + 1, items: items.length });
      return items;
    }
    if (seen.has(next)) throw new HotmartApiError("A paginação da Hotmart retornou um cursor repetido.", 200, "invalid_response", null, path, step); seen.add(next); pageToken = next;
  }
  throw new HotmartApiError("A paginação da Hotmart excedeu o limite de segurança.", 200, "invalid_response", null, path, step);
}
function isInvalidSalesParameter(error: unknown) {
  return error instanceof HotmartApiError && error.status === 400 && error.providerCode === "invalid_parameter";
}
function salesParamsForMode(base: URLSearchParams, mode: SalesQueryMode) {
  const params = new URLSearchParams(base);
  if (mode !== "bounded") params.delete("end_date");
  if (mode === "unbounded" || mode === "unbounded_default_page" || mode === "product_only") params.delete("start_date");
  if (mode === "product_only") params.delete("transaction_status");
  return params;
}
async function salesPages(base: URLSearchParams, initialMode: SalesQueryMode) {
  const modes: SalesQueryMode[] = ["bounded", "start_only", "unbounded", "unbounded_default_page", "product_only"];
  const startIndex = Math.max(0, modes.indexOf(initialMode));
  for (let index = startIndex; index < modes.length; index += 1) {
    const mode = modes[index];
    try {
      const items = await allPages("/payments/api/v1/sales/history", salesParamsForMode(base, mode), "sales", mode);
      return { items, mode };
    } catch (error) {
      if (!isInvalidSalesParameter(error) || index === modes.length - 1) throw error;
      console.warn("[hotmart-api] sales retry", { status: base.get("transaction_status"), rejectedMode: mode, nextMode: modes[index + 1] });
    }
  }
  throw new HotmartApiError("A Sales API não aceitou os filtros documentados.", 400, "invalid_response", null, "/payments/api/v1/sales/history", "sales");
}
async function salesGroupsForScope(base: URLSearchParams) {
  const groups: unknown[][] = [];
  let mode: SalesQueryMode = "bounded";
  for (const status of SALES_STATUSES) {
    const params = new URLSearchParams(base);
    params.set("transaction_status", status);
    const result = await salesPages(params, mode);
    mode = result.mode;
    groups.push(result.items);
    // Sem transaction_status, a Hotmart retorna APPROVED e COMPLETE por padrão.
    // A consulta é idêntica para os demais status, portanto não deve ser repetida.
    if (mode === "product_only") break;
  }
  return groups;
}
function productMatches(item: unknown, productId: string): boolean { return firstString(item, [["product", "id"], ["purchase", "product", "id"]]) === productId; }
function parseSale(item: unknown): HotmartTransaction | null {
  const transaction = firstString(item, [["purchase", "transaction"], ["transaction"]]); const status = firstString(item, [["purchase", "status"], ["status"]]);
  const date = toIso(at(item, "purchase", "approved_date")) ?? toIso(at(item, "purchase", "order_date")) ?? toIso(at(item, "approved_date")); if (!transaction || !status || !date) return null;
  const offerCode = firstString(item, [["purchase", "offer", "code"], ["offer", "code"]]);
  return { transaction, status, date, offerCode, tier: tierForOffer(offerCode), gross: money(at(item, "purchase", "price")) ?? money(at(item, "price")), producerCommission: null, paymentType: firstString(item, [["purchase", "payment", "type"], ["payment_type"]]) };
}
function parseSubscription(item: unknown): HotmartSubscription | null {
  const subscriberCode = firstString(item, [["subscriber_code"], ["subscriber", "code"]]); const status = firstString(item, [["status"]]); if (!subscriberCode || !status) return null;
  const offerCode = firstString(item, [["offer", "code"], ["plan", "offer", "code"]]);
  return { subscriberCode, status, offerCode, tier: tierForOffer(offerCode), price: money(at(item, "price")), accessionDate: toIso(at(item, "accession_date")), endDate: toIso(at(item, "end_accession_date")), nextChargeDate: toIso(at(item, "date_next_charge")), cancellationDate: toIso(at(item, "cancelation_date")) ?? toIso(at(item, "cancellation_date")) };
}
function singleCurrency(values: Array<Money | null>): Money | null {
  if (!values.length) return { value: 0, currency: "BRL" };
  const valid = values.filter((item): item is Money => item !== null); if (valid.length !== values.length) return null;
  if (valid.some((item) => item.currency !== valid[0].currency)) return null; return { value: valid.reduce((sum, item) => sum + item.value, 0), currency: valid[0].currency };
}
function dateParams(productId: string, from: string, to: string) {
  if (!/^\d{7}$/.test(productId)) throw new HotmartApiError("ID do produto Hotmart inválido.", null, "configuration", null, null, "sales");
  let start: number; let end: number;
  try { ({ start, end } = hotmartSalesEpochRange(from, to)); }
  catch { throw new HotmartApiError("Período da Hotmart inválido.", null, "invalid_response", null, null, "sales"); }
  return new URLSearchParams({ product_id: productId, start_date: String(start), end_date: String(end) });
}

export async function getHotmartFinanceReport(from: string, to: string, knownTransactions: string[] = []): Promise<HotmartFinanceReport> {
  const { productId } = credentials();
  let offerItems: unknown[] = []; let planItems: unknown[] = [];
  try {
    const productItems = await allPages("/products/api/v1/products", new URLSearchParams({ id: productId }), "products");
    const product = productItems.find((item) => firstString(item, [["id"]]) === productId);
    const productUcode = firstString(product, [["ucode"]]);
    if (productUcode) [offerItems, planItems] = await Promise.all([
      allPages(`/products/api/v1/products/${encodeURIComponent(productUcode)}/offers`, new URLSearchParams(), "offers"),
      allPages(`/products/api/v1/products/${encodeURIComponent(productUcode)}/plans`, new URLSearchParams(), "products"),
    ]);
  } catch (error) {
    if (!(error instanceof HotmartApiError) || error.code !== "forbidden") throw error;
  }
  const offerCodes = new Set(offerItems.map((item) => firstString(item, [["code"]])).filter((code): code is string => code !== null));
  const founderCode = process.env.HOTMART_FOUNDER_PLAN_ID?.trim() ?? "v4h77zvh";
  const standardCode = process.env.HOTMART_STANDARD_PLAN_ID?.trim() ?? "7mqlgaln";
  const requestedRange = dateParams(productId, from, to);
  const requestedStart = Number(requestedRange.get("start_date"));
  const requestedEnd = Number(requestedRange.get("end_date"));
  let salesGroups: unknown[][];
  try {
    salesGroups = await salesGroupsForScope(requestedRange);
  } catch (error) {
    if (!isInvalidSalesParameter(error)) throw error;
    console.warn("[hotmart-api] sales retry", { rejectedFilter: "product_id", nextFilter: "offer_code" });
    try {
      salesGroups = [];
      for (const offerCode of new Set([founderCode, standardCode])) {
        const offerRange = new URLSearchParams(requestedRange);
        offerRange.delete("product_id");
        offerRange.set("offer_code", offerCode);
        salesGroups.push(...await salesGroupsForScope(offerRange));
      }
    } catch (offerError) {
      if (!isInvalidSalesParameter(offerError) || knownTransactions.length === 0) throw offerError;
      console.warn("[hotmart-api] sales retry", { rejectedFilter: "offer_code", nextFilter: "known_transaction", transactions: knownTransactions.length });
      salesGroups = [];
      try {
        for (const transaction of new Set(knownTransactions.filter(Boolean))) {
          salesGroups.push(await allPages(
            "/payments/api/v1/sales/history",
            new URLSearchParams({ transaction }),
            "sales",
            "product_only",
          ));
        }
      } catch (transactionError) {
        if (!isInvalidSalesParameter(transactionError)) throw transactionError;
        console.warn("[hotmart-api] sales retry", { rejectedFilter: "known_transaction", nextFilter: "no_query" });
        salesGroups = [await allPages(
          "/payments/api/v1/sales/history",
          new URLSearchParams(),
          "sales",
          "product_only",
        )];
      }
    }
  }
  const transactionMap = new Map<string, HotmartTransaction>();
  for (const item of salesGroups.flat()) {
    if (!productMatches(item, productId)) continue;
    const sale = parseSale(item); const saleTime = sale ? new Date(sale.date).getTime() : Number.NaN;
    if (sale && saleTime >= requestedStart && saleTime <= requestedEnd) transactionMap.set(sale.transaction, sale);
  }
  const transactions = [...transactionMap.values()].sort((a, b) => b.date.localeCompare(a.date));
  const subscriptionParams = new URLSearchParams({ product_id: productId, accession_date: "0", end_accession_date: String(Date.now()) });
  const [subscriptionItems, subscriptionSummaries] = await Promise.all([
    allPages("/payments/api/v1/subscriptions", subscriptionParams, "subscriptions"),
    allPages("/payments/api/v1/subscriptions/summary", subscriptionParams, "subscriptions"),
  ]);
  const subscriptionDetails = new Map(subscriptionItems.filter((item) => productMatches(item, productId)).map((item) => [firstString(item, [["subscriber_code"]]), item]));
  const subscriptions = subscriptionSummaries.filter((item) => productMatches(item, productId)).map((item) => {
    const summary = parseSubscription(item); if (!summary) return null;
    const detail = subscriptionDetails.get(summary.subscriberCode);
    return { ...summary, price: summary.price ?? money(at(detail, "price")) };
  }).filter((item): item is HotmartSubscription => item !== null);
  const commissionItems = await allPages("/payments/api/v1/sales/commissions", dateParams(productId, from, to), "commissions");
  const commissionByTransaction = new Map<string, Money>();
  const producerCommissions = commissionItems.filter((item) => productMatches(item, productId)).flatMap((item) => array(at(item, "commissions")).filter((commission) => firstString(commission, [["source"]]) === "PRODUCER").map((commission) => {
    const source = record(at(commission, "commission")); const value = number(source.value); const currency = string(source.currency_value) ?? string(source.currency_code); const parsed = value === null || !currency ? null : { value, currency };
    const transaction = firstString(item, [["transaction"], ["purchase", "transaction"]]); if (transaction && parsed) commissionByTransaction.set(transaction, parsed); return parsed;
  }));
  for (const transaction of transactions) transaction.producerCommission = commissionByTransaction.get(transaction.transaction) ?? null;
  const revenueStatuses = new Set(["APPROVED", "COMPLETE"]); const gross = singleCurrency(transactions.filter((item) => revenueStatuses.has(item.status)).map((item) => item.gross));
  const producerCommission = singleCurrency(producerCommissions); const active = subscriptions.filter((item) => item.status === "ACTIVE"); const mrr = singleCurrency(active.map((item) => item.price)); const dailyMap = new Map<string, HotmartDailyPoint>();
  for (const sale of transactions.filter((item) => revenueStatuses.has(item.status))) { const date = sale.date.slice(0, 10); const point = dailyMap.get(date) ?? { date, transactions: 0, gross: 0 }; point.transactions += 1; if (sale.gross?.currency === "BRL") point.gross += sale.gross.value; dailyMap.set(date, point); }
  return { connected: true, from, to, transactions, subscriptions, daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)), gross, producerCommission, activeSubscriptions: active.length, founderActive: active.filter((item) => item.tier === "founder_477").length, standardActive: active.filter((item) => item.tier === "standard_990").length, canceledSubscriptions: subscriptions.filter((item) => item.status.includes("CANCEL")).length, refunds: transactions.filter((item) => item.status === "REFUNDED").length, chargebacks: transactions.filter((item) => item.status === "CHARGEBACK").length, mrr, mrrFormula: "Soma de price.value das assinaturas ACTIVE do produto, agrupadas pelo código da oferta; nenhuma assinatura inativa, atrasada ou cancelada entra no MRR.", founderOfferFound: offerCodes.has(founderCode), standardOfferFound: offerCodes.has(standardCode), subscriptionPlansFound: planItems.length };
}
export function hotmartApiConfigured(): boolean { return Boolean(process.env.HOTMART_CLIENT_ID?.trim() && process.env.HOTMART_CLIENT_SECRET?.trim() && process.env.HOTMART_BASIC_TOKEN?.trim() && process.env.HOTMART_PRODUCT_ID?.trim()); }
export function logHotmartApiFailure(error: unknown) {
  const normalized = error instanceof HotmartApiError ? error : null;
  console.error("[hotmart-api] failure", {
    step: normalized?.step ?? "unknown",
    httpStatus: normalized?.status ?? null,
    errorName: error instanceof Error ? error.name : "UnknownError",
    errorCode: normalized?.providerCode ?? normalized?.code ?? "unknown",
    providerMessage: normalized?.providerMessage ?? null,
    safeMessage: normalized?.message ?? "Falha inesperada na integração Hotmart.",
    credentialSetFingerprint: credentialSetFingerprint(),
    configuration: {
      HOTMART_CLIENT_ID: Boolean(process.env.HOTMART_CLIENT_ID?.trim()),
      HOTMART_CLIENT_SECRET: Boolean(process.env.HOTMART_CLIENT_SECRET?.trim()),
      HOTMART_BASIC_TOKEN: Boolean(process.env.HOTMART_BASIC_TOKEN?.trim()),
      HOTMART_PRODUCT_ID: Boolean(process.env.HOTMART_PRODUCT_ID?.trim()),
    },
  });
}
export async function validateHotmartConnection(): Promise<boolean> { return Boolean(await accessToken()); }
export async function probeHotmartAccess(): Promise<Record<"sales" | "subscriptions" | "commissions" | "products", { allowed: boolean; status: number | null }>> {
  const { productId } = credentials();
  const resources = {
    sales: ["/payments/api/v1/sales/history", new URLSearchParams({ product_id: productId, max_results: "1" })],
    subscriptions: ["/payments/api/v1/subscriptions", new URLSearchParams({ product_id: productId, max_results: "1" })],
    commissions: ["/payments/api/v1/sales/commissions", new URLSearchParams({ product_id: productId, max_results: "1" })],
    products: ["/products/api/v1/products", new URLSearchParams({ id: productId, max_results: "1" })],
  } as const;
  const entries = await Promise.all(Object.entries(resources).map(async ([name, [path, params]]) => {
    const step = name === "products" ? "products" : name as "sales" | "subscriptions" | "commissions";
    try { await apiGet(path, params, step); return [name, { allowed: true, status: 200 }] as const; }
    catch (error) { if (error instanceof HotmartApiError) return [name, { allowed: false, status: error.status }] as const; throw error; }
  }));
  return Object.fromEntries(entries) as Record<"sales" | "subscriptions" | "commissions" | "products", { allowed: boolean; status: number | null }>;
}
