import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRequestBodyTooLarge, isTrustedMutationOrigin } from "../src/lib/security/request";
import { safeNextPath } from "../src/lib/routing";

function source(path: string) { return readFileSync(path, "utf8"); }

assert.equal(safeNextPath("https://evil.example"), "/dashboard");
assert.equal(safeNextPath("//evil.example"), "/dashboard");
assert.equal(safeNextPath("/professor?tab=turmas"), "/professor?tab=turmas");

assert.equal(isTrustedMutationOrigin(new Request("https://nabulab.org/api/test", { method: "POST", headers: { origin: "https://nabulab.org" } })), true);
assert.equal(isTrustedMutationOrigin(new Request("https://nabulab.org/api/test", { method: "POST", headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" } })), false);
assert.equal(isRequestBodyTooLarge(new Request("https://nabulab.org", { headers: { "content-length": "4097" } }), 4096), true);

const migration = source("supabase/migrations/20261023221410_p8_operational_health_and_rate_limits.sql");
assert.match(migration, /alter table public\.api_rate_limits enable row level security/i);
assert.match(migration, /revoke all on function public\.consume_api_rate_limit[\s\S]+authenticated/i);
assert.match(migration, /grant execute on function public\.consume_api_rate_limit[\s\S]+service_role/i);
assert.match(migration, /security definer[\s\S]+set search_path = ''/i);
assert.match(migration, /alter table public\.system_job_runs enable row level security/i);

const nextConfig = source("next.config.ts");
for (const header of ["Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
  assert.ok(nextConfig.includes(header), `Header ausente: ${header}`);
}
assert.ok(!source("src/app/api/health/route.ts").match(/secret|token|version/i), "Health não pode expor detalhes sensíveis");
assert.ok(source("src/lib/analytics/ga4-data.ts").includes("fetchWithTimeout"));
assert.ok(source("src/lib/analytics/ga4-server.ts").includes("fetchWithTimeout"));
assert.ok(source("src/app/api/analytics/events/route.ts").includes("consumeApiRateLimit"));
assert.ok(source("src/app/api/billing/prepare/route.ts").includes("isTrustedMutationOrigin"));
assert.ok(!source("next.config.ts").includes('Access-Control-Allow-Origin", value: "*"'));

const pkg = JSON.parse(source("package.json")) as { dependencies: Record<string, string> };
assert.match(pkg.dependencies.next, /^\^?16\.4\.2$/);

console.log("Hardening P8: redirects, origem, payload, RLS/grants, health, timeouts, headers e dependências aprovados.");
