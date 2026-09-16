import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decideMfaBootstrap } from "../src/lib/admin/mfa-state";

assert.equal(decideMfaBootstrap("aal1", "aal1", 0), "enroll", "aal1/aal1 sem fator inicia enrollment");
assert.equal(decideMfaBootstrap("aal1", "aal2", 1), "challenge", "aal1/aal2 com TOTP verificado pede challenge");
assert.equal(decideMfaBootstrap("aal2", "aal2", 1), "verified", "aal2/aal2 redireciona imediatamente");
assert.equal(decideMfaBootstrap("aal1", "aal1", 1), "inconsistent", "fator verificado inconsistente não inicia novo enrollment");

const component = readFileSync("src/components/admin/mfa-enrollment.tsx", "utf8");
assert.doesNotMatch(component, /initializedRef/, "Strict Mode não pode ser bloqueado por initializedRef permanente");
assert.match(component, /runIdRef/);
assert.doesNotMatch(component, /console\.info/, "logs temporários de lifecycle devem ser removidos");
assert.match(component, /verify:recovered/);
assert.match(component, /severity: "warn" \| "error"/);
assert.match(component, /REMOTE_TIMEOUT_MS = 12_000/);
for (const operation of [
  "getAuthenticatorAssuranceLevel",
  "listFactors",
  "unenroll",
  "enroll",
  "challenge",
  "verify",
  "refreshSession",
]) {
  assert.match(component, new RegExp(`withTimeout\\([^;\\n]*${operation}|withTimeout\\([\\s\\S]{0,180}${operation}`), `${operation} precisa de timeout`);
}

console.log("MFA: lifecycle Strict Mode, estados AAL e timeouts validados.");
