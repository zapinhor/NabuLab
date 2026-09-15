import assert from "node:assert/strict";
import { isAnalyticsEventName, sanitizeAnalyticsProperties } from "../src/lib/analytics/events";
import { isPublicAppPath, safeNextPath } from "../src/lib/routing";

assert.equal(isPublicAppPath("/"), true, "landing must be public");
assert.equal(isPublicAppPath("/login"), true, "login must be public");
assert.equal(isPublicAppPath("/termos"), true, "terms must be public");
assert.equal(isPublicAppPath("/dashboard"), false, "dashboard must be protected");
assert.equal(isPublicAppPath("/historico"), false, "academic history must be protected");
assert.equal(safeNextPath("/premium"), "/premium", "valid next must be preserved");
assert.equal(safeNextPath("https://example.com"), "/dashboard", "external next must be rejected");
assert.equal(safeNextPath("//example.com"), "/dashboard", "protocol-relative next must be rejected");
assert.equal(isAnalyticsEventName("landing_view"), true, "known event must be accepted");
assert.equal(isAnalyticsEventName("password_captured"), false, "unknown event must be rejected");
assert.deepEqual(sanitizeAnalyticsProperties({ placement: "hero", nested: { secret: true }, long: "x".repeat(121) }), { placement: "hero" });
console.log("C3 routing and analytics validation: 11 assertions passed.");
