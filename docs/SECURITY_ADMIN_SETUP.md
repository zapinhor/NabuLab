# Security hardening e Admin Control Center

## Variáveis server-only

- `AUTH_RATE_LIMIT_SECRET`: segredo aleatório longo usado somente para HMAC dos buckets de conta e origem.
- `AUTH_LOGIN_MAX_ATTEMPTS`, `AUTH_LOGIN_WINDOW_MINUTES`, `AUTH_LOGIN_COOLDOWN_MINUTES`: opcionais; defaults `5`, `15`, `15`.
- `GA4_API_SECRET`: criado em GA4 > Admin > Data streams > Measurement Protocol API secrets.
- `GA4_PROPERTY_ID`: ID numérico da propriedade, não o Measurement ID `G-...`.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` e `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: conta de serviço com papel Viewer na propriedade GA4.
- Credenciais futuras da API Hotmart devem permanecer server-only; os webhooks atuais não fornecem taxas e receita líquida suficientes.
  Para a API oficial serão necessários `HOTMART_CLIENT_ID` e `HOTMART_CLIENT_SECRET`, criados nas credenciais da conta Hotmart e nunca enviados ao navegador.

## Variáveis públicas

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Site Key criada no Cloudflare Turnstile.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID` e `NEXT_PUBLIC_TIKTOK_PIXEL_ID` são identificadores públicos.

Configure o Turnstile também em Supabase > Authentication > Bot and Abuse Protection usando o **Secret Key** da Cloudflare. O secret não pertence ao código nem a uma variável `NEXT_PUBLIC_`. Sem a Site Key, desenvolvimento continua sem CAPTCHA.

## Auth recomendado no Supabase

- senha mínima: 8 caracteres ou mais;
- confirmação de e-mail: ativada em produção;
- secure password change: ativado;
- proteção contra senhas vazadas: **ENABLED** em produção; o Supabase exige plano Pro ou superior para `password_hibp_enabled`;
- manter rotação de refresh token e rate limits nativos;
- habilitar TOTP e exigir AAL2 nas áreas sensíveis de `super_admin`.

## UTMs

Padrão: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
Exemplo: `utm_source=tiktok&utm_medium=paid_social&utm_campaign=founder_launch`.

## CSP

A CSP inicia em `Report-Only` para observar Supabase, GA4, Hotmart e pixels antes de bloquear recursos legítimos.
