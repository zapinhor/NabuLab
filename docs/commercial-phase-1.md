# NabuLab — Fase 1 comercial

Esta fase adiciona Auth, isolamento multi-instituição, membros, turmas e convites sem migrar nem remover a persistência local da demo. Questões, simulados, histórico e metas continuam em TypeScript, IndexedDB e localStorage até as fases próprias.

## 1. Criar e conectar o projeto Supabase

1. No painel Supabase, crie ou abra o projeto **NabuLab**.
2. Abra **Connect**, selecione **Next.js** e copie somente:
   - Project URL;
   - Publishable key (`sb_publishable_...`). A chave legada `anon` também funciona durante a transição, mas a publishable é preferida.
3. Copie `.env.example` para `.env.local` e substitua os dois valores.
4. Nunca use `service_role` ou `sb_secret_...` em variável `NEXT_PUBLIC_`.

O `.env.local` já está ignorado pelo Git. Reinicie `npm run dev` depois de alterar variáveis.

## 2. Aplicar a migration

Opção preferida, depois de autenticar e vincular o CLI ao projeto correto:

```text
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF
npx supabase db push
```

Confirme cuidadosamente o nome e o `project-ref` antes do push. Alternativamente, abra **SQL Editor > New query**, cole todo o conteúdo de `supabase/migrations/20260908065621_commercial_foundation.sql` e execute uma vez.

Projetos Supabase criados após abril de 2026 podem não expor automaticamente tabelas novas na Data API. A migration inclui os `GRANT`s explícitos necessários e RLS em todas as tabelas públicas.

## 3. Criar o primeiro Super Admin

1. Rode a aplicação e cadastre sua conta em `/cadastro`.
2. No painel Supabase, abra **Authentication > Users** e copie o UUID exato dessa conta.
3. No SQL Editor, revise o UUID e execute:

```sql
insert into public.platform_admins (user_id)
values ('UUID_EXATO_DA_SUA_CONTA');
```

O papel global não usa `user_metadata`, não é concedido pelo frontend e não é um membership de instituição.

## 4. Roteiro de teste local

Use e-mails diferentes para três contas. Se confirmação de e-mail estiver ligada, confirme cada conta pelo Inbucket local ou pelo e-mail real do projeto.

1. **Super Admin**: entre em `/comercial`, crie a instituição, ajuste logo/cores e convide o Diretor pelo e-mail exato.
2. **Diretor**: entre, aceite o convite em **Seus convites**, convide Coordenador e Professor.
3. **Professor**: aceite o convite e crie uma turma.
4. **Aluno interno**: para simular um aluno já vinculado, convide-o primeiro para uma turma e aceite; ele será associado atomicamente à instituição como `student`. Em outra turma da mesma instituição, selecione-o em **Adicionar aluno da instituição**.
5. **Aluno externo com conta**: informe e-mail exato ou username exato em **Convidar aluno externo**. Entre como aluno e aceite ou recuse.
6. **Aluno sem conta**: o convite por e-mail pode ser criado e fica pendente; o envio real de e-mail e o deep link serão adicionados em fase posterior. Depois que a conta for criada com o mesmo e-mail, o convite aparece na plataforma.

Valide ainda:

- um professor não vê usuários de outra instituição;
- uma busca parcial de aluno externo falha;
- um professor só gerencia as turmas que criou;
- aceitar convite vencido, revogado ou já usado falha;
- a demo em `/` e todos os dados locais continuam funcionando.

## 5. Desenvolvimento local completo

Para executar o banco localmente, instale Docker Desktop ou Podman e então rode:

```text
npx supabase start
npx supabase db reset
```

Sem um runtime de contêiner, a interface Next.js ainda pode ser validada contra o projeto Supabase remoto de desenvolvimento.

## Segurança implementada

- RLS em todas as tabelas públicas sensíveis e grants explícitos;
- helpers de policy no schema privado para evitar recursão;
- funções privilegiadas com `search_path` vazio, checagem de `auth.uid()` e permissões de execução revogadas por padrão;
- tokens aleatórios de 256 bits armazenados somente como SHA-256;
- convites institucionais separados dos convites de turma;
- aceite de aluno cria membership e matrícula na mesma transação;
- busca externa somente por e-mail ou username exatos dentro de RPC autorizada;
- tabela append-only de eventos preparada para auditoria futura;
- nenhuma chave administrativa no Next.js.

## Roadmap posterior

- Fase 2: gestão completa de instituições, permissões e branding.
- Fase 3: matrículas em escala e importação CSV.
- Fase 4: banco de questões PostgreSQL, CRUD e visibilidades.
- Fase 5: simulados e respostas na nuvem.
- Fase 6: atribuições, prazos e tentativas.
- Fase 7: analytics de aluno, turma e instituição.
- Fase 8: revisão, domínio, evolução, recomendado e metas na nuvem.
- Fase 9: billing, planos, limites, white-label avançado e domínio customizado.
- Fase 10: produção, LGPD, logs, backups, onboarding e segurança final.
