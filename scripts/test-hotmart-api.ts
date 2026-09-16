import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOTMART_CLOCK_SKEW_MS, hotmartSalesEpochRange, tierForOffer } from "../src/lib/billing/hotmart-api-model";

assert.equal(tierForOffer("v4h77zvh"), "founder_477");
assert.equal(tierForOffer("7mqlgaln"), "standard_990");
assert.equal(tierForOffer("outra-oferta"), null);
const duringToday = new Date("2026-09-16T03:13:00.000-03:00").getTime();
assert.deepEqual(hotmartSalesEpochRange("2026-08-18", "2026-09-16", duringToday), {
  start: new Date("2026-08-18T00:00:00.000-03:00").getTime(),
  end: duringToday - HOTMART_CLOCK_SKEW_MS,
}, "período terminando hoje aplica margem contra diferença de relógio do provedor");
assert.deepEqual(hotmartSalesEpochRange("2026-08-18", "2026-09-14", duringToday), {
  start: new Date("2026-08-18T00:00:00.000-03:00").getTime(),
  end: new Date("2026-09-14T23:59:59.999-03:00").getTime(),
}, "dia histórico preserva o fim do dia em São Paulo");
assert.throws(() => hotmartSalesEpochRange("2026-09-17", "2026-09-17", duringToday), /HOTMART_INVALID_DATE_RANGE/);
const client = readFileSync("src/lib/billing/hotmart-api.ts", "utf8");
const financePage = readFileSync("src/app/admin/finance/page.tsx", "utf8");
const subscriptionsPage = readFileSync("src/app/admin/subscriptions/page.tsx", "utf8");
assert.match(client, /\.trim\(\)[\s\S]*\.trim\(\)[\s\S]*\.trim\(\)[\s\S]*\.trim\(\)/, "credenciais devem remover whitespace externo");
assert.match(client, /\/\^Basic\\s\+\/i\.test\(config\.basicToken\)/, "Basic já prefixado não pode virar Basic Basic");
assert.match(client, /application\/x-www-form-urlencoded/, "OAuth client_credentials usa content type oficial");
assert.match(client, /\[hotmart-api\] failure/);
assert.match(client, /sales query/);
assert.match(client, /for \(const status of SALES_STATUSES\)/, "status de venda devem ser consultados separadamente");
assert.match(client, /params\.set\("transaction_status", status\)/, "cada request deve conter exatamente um status");
assert.doesNotMatch(client, /salesParams\.append\("transaction_status"/, "não deve repetir status na mesma URL");
assert.match(client, /salesMode !== "unbounded_default_page"/, "fallback deve testar Sales sem max_results explícito");
assert.match(client, /mode === "product_only"\) params\.delete\("transaction_status"\)/, "fallback mínimo deve testar somente product_id");
assert.match(client, /if \(mode === "product_only"\) break/, "consulta sem status não deve ser repetida para cada status");
assert.match(client, /rejectedFilter: "product_id", nextFilter: "offer_code"/, "Sales deve recorrer às ofertas quando product_id for rejeitado");
assert.match(client, /offerRange\.delete\("product_id"\)/, "fallback por oferta não deve manter o filtro rejeitado");
assert.match(client, /offerRange\.set\("offer_code", offerCode\)/, "fallback deve consultar somente ofertas conhecidas do NabuLab");
assert.match(client, /nextFilter: "known_transaction"/, "Sales deve recorrer às transações persistidas quando os filtros de catálogo forem rejeitados");
assert.match(client, /new URLSearchParams\(\{ transaction \}\)/, "fallback final deve consultar uma transação conhecida por vez");
assert.match(client, /salesGroups\.flat\(\)/);
assert.match(client, /transactionMap\.set\(sale\.transaction, sale\)/, "transações devem ser deduplicadas pelo ID");
assert.match(client, /\[hotmart-api\] sales status/);
assert.match(client, /SalesQueryMode = "bounded" \| "start_only" \| "unbounded"/);
assert.match(client, /isInvalidSalesParameter/);
assert.match(client, /sales retry/);
assert.match(client, /providerMessage: normalized\?\.providerMessage/, "diagnóstico deve registrar somente a mensagem segura do provedor");
assert.match(client, /credentialSetFingerprint: credentialSetFingerprint\(\)/, "diagnóstico deve permitir comparar ambientes sem revelar credenciais");
assert.match(client, /saleTime >= requestedStart && saleTime <= requestedEnd/, "fallback amplo deve ser filtrado localmente");
assert.match(client, /hotmartSalesEpochRange\(from, to\)/);
assert.doesNotMatch(client, /console\.(?:log|error|warn)\([^\n]*(?:clientSecret|basicToken|access_token)/, "segredos não podem ser registrados");
assert.match(financePage, /preferredRegion = "gru1"/, "Finance deve executar próximo da Hotmart no Brasil");
assert.match(subscriptionsPage, /preferredRegion = "gru1"/, "Subscriptions deve executar próximo da Hotmart no Brasil");
console.log("Hotmart API mapping tests passed.");
