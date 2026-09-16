import assert from "node:assert/strict";
import { tierForOffer } from "../src/lib/billing/hotmart-api-model";

assert.equal(tierForOffer("v4h77zvh"), "founder_477");
assert.equal(tierForOffer("7mqlgaln"), "standard_990");
assert.equal(tierForOffer("outra-oferta"), null);
console.log("Hotmart API mapping tests passed.");
