import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ATTRIBUTION_MAX_AGE, channelName, parseCampaign, readAttribution, shouldCountLanding } from "../src/lib/analytics/acquisition";

const campaign = parseCampaign(new URLSearchParams("utm_source=tiktok&utm_medium=paid&utm_campaign=NabuLab%20Cadastro&utm_content=quiz_01"));
assert.deepEqual(campaign, { source: "tiktok", medium: "paid", campaign: "NabuLab Cadastro", content: "quiz_01" });
assert.equal(parseCampaign(new URLSearchParams("utm_campaign=sem_origem")), null);
assert.equal(parseCampaign(new URLSearchParams("utm_source=tiktok&utm_medium=paid&utm_content=email%40example.com")), null);
assert.equal(channelName("tiktok", "paid"), channelName("tiktok", "paid_social"));
assert.equal(channelName("google", "organic"), "Google Orgânico");
assert.equal(channelName("(direct)", "(none)"), "Acesso direto");
assert.equal(channelName("(not set)", ""), "Não identificado");

const landing = { method: "GET", path: "/cadastro", accept: "text/html", userAgent: "Mozilla/5.0", fetchMode: "navigate", prefetch: null };
assert.equal(shouldCountLanding(landing), true);
assert.equal(shouldCountLanding({ ...landing, userAgent: "Googlebot" }), false);
assert.equal(shouldCountLanding({ ...landing, prefetch: "1" }), false);
assert.equal(shouldCountLanding({ ...landing, path: "/dashboard" }), false);
assert.equal(shouldCountLanding({ ...landing, method: "POST" }), false);

const now = Date.now();
assert.deepEqual(readAttribution(encodeURIComponent(JSON.stringify({ ...campaign, timestamp: now }))), campaign);
assert.equal(readAttribution(encodeURIComponent(JSON.stringify({ ...campaign, timestamp: now - (ATTRIBUTION_MAX_AGE + 1) * 1000 }))), null);

const migration = readFileSync("supabase/migrations/20261002153551_acquisition_daily_metrics.sql", "utf8");
const proxy = readFileSync("src/proxy.ts", "utf8");
const attribution = readFileSync("src/components/analytics/campaign-attribution.tsx", "utf8");
const signup = readFileSync("src/app/auth/confirm/route.ts", "utf8");
const checkout = readFileSync("src/app/api/billing/prepare/route.ts", "utf8");
const admin = readFileSync("src/app/admin/acquisition/page.tsx", "utf8");
assert.match(migration, /on conflict[\s\S]*event_count \+ 1/i, "incremento deve ser atômico");
assert.match(migration, /enable row level security/i);
assert.match(migration, /revoke all on public\.acquisition_daily_metrics from public, anon, authenticated/i);
assert.doesNotMatch(migration, /\b(ip|email|user_id|username|user_agent|phone)\b/i, "agregado não pode conter PII");
assert.match(proxy, /shouldCountLanding[\s\S]*landing_request/);
assert.match(attribution, /consent\.analytics \|\| consent\.marketing|!consent\.analytics && !consent\.marketing/);
assert.match(attribution, /nabulab:consent-changed/);
assert.match(signup, /flow === "signup"[\s\S]*signup_completed/);
assert.match(signup, /type === "signup"[\s\S]*signup_completed/);
assert.match(checkout, /getConfiguredCheckout[\s\S]*checkout_started/);
assert.match(admin, /requirePlatformAdmin\(\{ aal2: true/);
console.log("Acquisition: parsing, consent, attribution, atomic aggregation and admin guard validated.");
