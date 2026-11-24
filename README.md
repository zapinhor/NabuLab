# NabuLab

Plataforma de simulados para vestibulares, concursos, OAB e CNH, com área do aluno, área do professor e assinatura.

**Em produção:** [nabulab.org](https://nabulab.org)

## O que faz

**Aluno**

- Simulados por matéria, dificuldade, tipo e quantidade de questões.
- Correção comentada, revisão de erros, metas, histórico e domínio por conteúdo.
- Teste sem cadastro, plano gratuito com cota diária e plano Premium.

**Professor**

- Turmas com convite, biblioteca de questões, simulados e atividades.
- Resultados da turma por aluno e por assunto, com exportação.
- Análises e sugestões de revisão determinísticas, sem IA generativa.
- Os dados da turma ficam separados do histórico pessoal do aluno.

**Administração**

- Métricas de aquisição, assinaturas e conteúdo, com acesso protegido por MFA (TOTP/AAL2).

O banco tem **2.904 questões em 59 matérias**, conferidas por `npm run audit`.

## Stack

| Camada | Tecnologias |
|---|---|
| Interface | Next.js (App Router), React, TypeScript, Tailwind CSS, Recharts |
| Dados e autenticação | Supabase: PostgreSQL, Auth, Row Level Security, RPCs e Realtime |
| Dados no navegador | IndexedDB com Dexie, sincronizado com a nuvem |
| Pagamento e e-mail | Hotmart (webhook e API) e Resend |
| Hospedagem | Vercel, região `gru1` |

## Arquitetura

```text
Navegador ── Next.js (Vercel) ── Supabase (PostgreSQL + RLS)
                 │
                 ├── /api/exams/*            gera e corrige simulados no servidor
                 ├── /api/billing/*          prepara o checkout
                 └── /api/webhooks/hotmart   recebe eventos de assinatura
```

| Pasta | Conteúdo |
|---|---|
| `src/app` | Páginas e rotas de API |
| `src/components` | Componentes por área (aluno, professor, admin) |
| `src/lib` | Regras de negócio: correção, cotas, cobrança, segurança, análises |
| `src/data` | Questões e aulas |
| `supabase/migrations` | Esquema, políticas RLS e funções SQL |
| `supabase/tests` | Testes SQL de segurança, cobrança e turmas |
| `scripts` | Testes e auditorias executados com `tsx` |

## Pontos técnicos

- **Correção no servidor:** o navegador recebe enunciados e alternativas, sem o gabarito. A prova vai com um token assinado (HMAC), vinculado ao usuário e com validade.
- **Webhook idempotente:** o token é comparado em tempo constante, eventos repetidos são ignorados e eventos fora de ordem são marcados como desatualizados.
- **Controle de acesso em camadas:** RLS no banco, verificação de plano no servidor e rotas protegidas no `src/proxy.ts`.
- **Proteção contra abuso:** rate limit com identificador em HMAC, verificação de origem, limite de tamanho do corpo e Turnstile no login e no cadastro.

## Rodar localmente

Requer Node.js 22 ou superior e um projeto Supabase.

```bash
npm install
cp .env.example .env.local   # preencha com as chaves do seu projeto
npm run dev
```

Aplique as migrations de `supabase/migrations` em um projeto de desenvolvimento, nunca no de produção. As variáveis estão descritas em `.env.example` e em `docs/SECURITY_ADMIN_SETUP.md`.

## Testes e verificações

```bash
npx next typegen && npm run typecheck
npm run lint
npm run audit            # consistência do banco de questões
npm run test:hotmart     # webhook de assinatura
npm run test:security    # regras de segurança
npm run test:quota       # cota de questões do aluno
```

O `package.json` reúne 41 scripts `test:*`. Destes, 34 rodam sem serviços externos; os terminados em `:staging` ou `:live` precisam de ambiente configurado.

## Uso de IA

O projeto é desenvolvido com assistência do Claude Code. Parte dos commits é de autoria do agente ou registra a coautoria, e o histórico é mantido como está.

## Autoria

Danilo Petraglia · [portfólio](https://zapinhor.github.io/Portfolio/) · [LinkedIn](https://www.linkedin.com/in/danilopetraglia/)

Este repositório não tem licença de código aberto.
