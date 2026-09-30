import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const consent = readFileSync("src/components/analytics/consent-manager.tsx", "utf8");
const route = readFileSync("src/components/analytics/tiktok-route-event.tsx", "utf8");
const conversion = readFileSync("src/components/analytics/ga-route-event.tsx", "utf8");
const signup = readFileSync("src/app/auth/actions.ts", "utf8");
const confirmation = readFileSync("src/app/auth/confirm/route.ts", "utf8");
const registrationEndpoint = readFileSync("src/app/api/analytics/registration-completion/route.ts", "utf8");
const tracking = readFileSync("src/components/analytics/track-event.tsx", "utf8");
const checkout = readFileSync("src/components/billing/premium-plan-actions.tsx", "utf8");
const login = readFileSync("src/components/security/login-form.tsx", "utf8");
const webhook = readFileSync("src/app/api/webhooks/hotmart/route.ts", "utf8");

assert.match(consent, /consent\?\.marketing/, "TikTok deve depender de consentimento de marketing");
assert.match(consent, /id="nabulab-tiktok"/, "script base deve possuir id único");
assert.doesNotMatch(consent, /ttq\.page\(\)/, "script base não deve duplicar PageView");
assert.match(route, /lastPage\.current === pageKey/, "PageView deve deduplicar a mesma rota");
assert.match(route, /trackTikTokPageView/, "App Router deve enviar PageView");
assert.match(signup, /flow=signup/, "cadastro por e-mail deve identificar explicitamente o fluxo de signup");
assert.match(confirmation, /REGISTRATION_COMPLETION_COOKIE[\s\S]*response\.cookies\.set/, "confirmação externa deve persistir o marcador server-side");
assert.match(registrationEndpoint, /auth\.getUser\(\)/, "marcador só pode ser consumido por usuário autenticado");
assert.match(registrationEndpoint, /maxAge: 0/, "marcador deve ser consumido uma única vez");
assert.match(conversion, /registrationCheckInFlight/, "Strict Mode não pode consumir o marcador duas vezes");
assert.match(conversion, /usePathname[\s\S]*useSearchParams/, "retorno por navegação externa ou interna deve reavaliar o marcador");
assert.match(conversion, /shouldTrack === true[\s\S]*CompleteRegistration/, "cadastro confirmado deve enviar CompleteRegistration");
assert.match(conversion, /nabulab:consent-changed/, "cadastro deve aguardar consentimento de marketing");
assert.match(tracking, /premium_page_viewed[\s\S]*ViewContent/, "Premium deve enviar ViewContent");
assert.match(checkout, /response\.ok[\s\S]*trackTikTokEvent\("InitiateCheckout"/, "checkout só deve disparar após prepare bem-sucedido");
assert.doesNotMatch(login, /CompleteRegistration/, "login não pode enviar evento de cadastro");
assert.doesNotMatch(`${tracking}\n${checkout}`, /CompletePayment|\"Purchase\"/, "browser não pode declarar pagamento concluído");
assert.match(webhook, /PURCHASE_APPROVED|PURCHASE_COMPLETE/, "pagamento confiável permanece no webhook Hotmart");
assert.match(consent, /nabulab-ga/, "Google Analytics existente deve permanecer instalado");

console.log("TikTok Pixel: consentimento, PageView e conversões mínimas validados.");
