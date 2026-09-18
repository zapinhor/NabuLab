import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const widget = readFileSync("src/components/security/turnstile-field.tsx", "utf8");
const login = readFileSync("src/app/api/auth/login/route.ts", "utf8");
const actions = readFileSync("src/app/auth/actions.ts", "utf8");
const resetPage = readFileSync("src/app/redefinir-senha/page.tsx", "utf8");

assert.match(widget, /api\.js\?render=explicit/);
assert.match(widget, /window\.turnstile\.render/);
assert.match(widget, /"expired-callback"/);
assert.match(widget, /"error-callback"/);
assert.match(widget, /window\.turnstile\.reset/);
assert.doesNotMatch(widget, /turnstile\.ready/, "renderização não depende de turnstile.ready");
assert.doesNotMatch(widget, /console\./, "token e estado do CAPTCHA não devem ser logados");
assert.match(widget, /canSubmit && !canSubmit\(\)/, "validação dos campos ocorre antes do erro de CAPTCHA");
assert.match(login, /requiredCaptchaToken\(body\.captchaToken\)/);
assert.equal((actions.match(/requiredCaptchaToken\(formData\.get\("captcha_token"\)\)/g) ?? []).length, 2, "cadastro e recuperação exigem CAPTCHA");
assert.doesNotMatch(resetPage, /TurnstileField/, "troca efetiva da senha não adiciona segundo CAPTCHA");
assert.doesNotMatch(widget, /SECRET|HOTTOK|access_token|refresh_token/i);

console.log("Turnstile: renderização explícita, estados, reset e proteção server-side validados.");
