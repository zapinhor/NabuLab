# Fase C0 — Student Account & Cloud Sync

## Persistência anterior

- `NabuLabDB` (IndexedDB/Dexie): `exams` guardava a prova concluída e seus totais; `answers` guardava a resposta de cada questão. Dashboard, histórico, análise, domínio, evolução, revisão de erros, consistência e modo recomendado consultavam essas duas tabelas.
- `nabulab:study-goals:v1` (localStorage): metas semanais de questões, simulados e dias de estudo, consumidas pelo dashboard e pela página de metas.
- `nabulab:exam:current-session:v1`, `nabulab:exam:current-progress:v1` e `nabulab:exam:current-submission:v1` (sessionStorage): configuração, progresso e submissão da prova corrente. São estados temporários e permanecem apenas na sessão do navegador.

## Arquitetura C0

- `exam_attempts`: fonte durável das tentativas concluídas, vinculada ao estudante.
- `exam_answers`: respostas individuais. Textos, tópicos e demais metadados das questões não são duplicados; o cache é reconstituído usando o banco versionado pelo `question_id`.
- Novas respostas incluem um `question_snapshot` mínimo. O banco atual continua sendo a primeira fonte para reconstrução; o snapshot é usado apenas se o ID deixar de existir.
- `student_preferences`: metas acadêmicas e marcador de migração local.
- IndexedDB e localStorage continuam como cache para preservar as consultas existentes. Antes de renderizar uma rota de estudo, o cache é hidratado a partir do Supabase.
- Uma prova é gravada primeiro no cache e depois enviada à conta. Falhas de rede mantêm a prova local para reenvio idempotente no próximo bootstrap.
- Histórico, erros, desempenho, domínio, evolução e recomendações continuam derivados de tentativas e respostas; não existem tabelas-resumo duplicadas.

## Migração e isolamento

Na primeira autenticação do navegador, os IDs estáveis das provas e respostas locais são enviados por `upsert`. O navegador registra qual usuário recebeu o legado. Repetir o login não duplica registros. Ao alternar de conta, o cache acadêmico e as metas são limpos antes de baixar os dados do novo usuário, impedindo vazamento ou migração cruzada.

Respostas antigas sem questão atual e sem snapshot são mantidas no Supabase, registradas no console como órfãs e omitidas apenas do cache reconstruído. A tentativa correspondente permanece disponível e as demais respostas continuam sendo hidratadas.

Todas as tabelas acadêmicas têm RLS para `select`, `insert`, `update` e `delete`, sempre com `(select auth.uid()) = user_id`. O vínculo composto entre respostas e tentativas também exige o mesmo `user_id`.

## Rotas

Durante a C0, `/` e as rotas de estudo exigem sessão e redirecionam para `/login`. A lista de rotas públicas está isolada no proxy, permitindo que `/` seja convertida em landing pública futuramente sem acoplar a página à lógica de autenticação.
