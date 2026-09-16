import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const routes = ["page.tsx","product/page.tsx","acquisition/page.tsx","conversion/page.tsx","finance/page.tsx","subscriptions/page.tsx","system/page.tsx"];
for (const route of routes) assert.equal(existsSync(`src/app/admin/${route}`), true, `missing admin/${route}`);
const auth = readFileSync("src/lib/admin/auth.ts", "utf8");
const mfa = readFileSync("src/components/admin/mfa-enrollment.tsx", "utf8");
assert.match(auth, /platform_admins/);
assert.match(auth, /super_admin/);
assert.match(auth, /currentLevel !== "aal2"/);
assert.match(
  readFileSync("src/app/admin/finance/page.tsx", "utf8"),
  /superAdmin\s*:\s*true\s*,\s*aal2\s*:\s*true/,
);
assert.match(readFileSync("src/app/admin/subscriptions/page.tsx", "utf8"), /limit\(100\)/);
assert.match(mfa, /mfa\.enroll/);
assert.match(mfa, /mfa\.challenge/);
assert.match(mfa, /mfa\.verify/);
assert.doesNotMatch(
  mfa,
  /(?:console\.|developmentLog\()[^\n]*(?:enrollment\.secret|qrCodeSrc|data\.totp|\bcode\s*[},])/i,
  "MFA secret, QR and TOTP code are not logged",
);
console.log("Admin: routes, platform roles, AAL2 gating and bounded subscriptions validated.");
