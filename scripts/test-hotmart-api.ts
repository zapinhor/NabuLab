import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { tierForOffer } from "../src/lib/billing/hotmart-api-model";

assert.equal(tierForOffer("v4h77zvh"), "founder_477");
assert.equal(tierForOffer("7mqlgaln"), "standard_990");
assert.equal(tierForOffer("outra-oferta"), null);
const client = readFileSync("src/lib/billing/hotmart-api.ts", "utf8");
assert.match(client, /\.trim\(\)[\s\S]*\.trim\(\)[\s\S]*\.trim\(\)[\s\S]*\.trim\(\)/, "credenciais devem remover whitespace externo");
assert.match(client, /\/\^Basic\\s\+\/i\.test\(config\.basicToken\)/, "Basic já prefixado não pode virar Basic Basic");
assert.match(client, /application\/x-www-form-urlencoded/, "OAuth client_credentials usa content type oficial");
assert.match(client, /\[hotmart-api\] failure/);
assert.doesNotMatch(client, /console\.(?:log|error|warn)\([^\n]*(?:clientSecret|basicToken|access_token)/, "segredos não podem ser registrados");
console.log("Hotmart API mapping tests passed.");
