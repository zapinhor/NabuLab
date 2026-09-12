begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(13);

select ok(
  (select count(*) = 3 and bool_and(c.relrowsecurity)
   from pg_class c
   join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relname = any(array['exam_attempts', 'exam_answers', 'student_preferences'])),
  'RLS está habilitado em todas as tabelas acadêmicas'
);

select ok(
  not has_table_privilege('anon', 'public.exam_attempts', 'select')
  and not has_table_privilege('anon', 'public.exam_answers', 'select')
  and not has_table_privilege('anon', 'public.student_preferences', 'select'),
  'anon não possui acesso às tabelas acadêmicas'
);

select ok(
  has_table_privilege('authenticated', 'public.exam_attempts', 'select,insert,update,delete')
  and has_table_privilege('authenticated', 'public.exam_answers', 'select,insert,update,delete')
  and has_table_privilege('authenticated', 'public.student_preferences', 'select,insert,update,delete'),
  'authenticated possui operações submetidas a RLS'
);

select is(
  (select count(*)::integer from pg_policies
   where schemaname = 'public'
     and tablename = any(array['exam_attempts', 'exam_answers', 'student_preferences'])
     and coalesce(qual, with_check, '') like '%auth.uid%'),
  12,
  'todas as operações usam propriedade baseada em auth.uid'
);

select col_is_pk('public', 'student_preferences', 'user_id',
  'preferências possuem uma única linha por estudante');

select col_type_is('public', 'exam_answers', 'question_snapshot', 'jsonb',
  'respostas aceitam snapshot histórico em JSONB');

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
   'student-a@nabulab.test', crypt('test-password-a', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Student A","username":"student-a"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated',
   'student-b@nabulab.test', crypt('test-password-b', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Student B","username":"student-b"}', now(), now());

set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);

select lives_ok($$
  insert into public.exam_attempts (
    user_id, id, created_at, started_at, submitted_at, mode,
    total_questions, answered, unanswered, correct, incorrect, percentage,
    difficulty, question_type, selected_subjects, subjects, question_ids
  ) values (
    '10000000-0000-0000-0000-000000000001', 'attempt-a', now(), now(), now(), 'manual',
    1, 1, 0, 1, 0, 100, 'iniciante', 'multiple-choice',
    array['historia'], array['historia'], array['vest-historia-001']
  )
$$, 'Conta A pode criar a própria tentativa');

select set_config('request.jwt.claim.sub', '20000000-0000-0000-0000-000000000002', true);

select is(
  (select count(*)::integer from public.exam_attempts where id = 'attempt-a'),
  0,
  'Conta B não consegue visualizar a tentativa da Conta A'
);

select results_eq(
  $$update public.exam_attempts set percentage = 0 where id = 'attempt-a' returning id$$,
  array[]::text[],
  'Conta B não consegue alterar a tentativa da Conta A'
);

select lives_ok($$
  insert into public.exam_attempts (
    user_id, id, created_at, started_at, submitted_at, mode,
    total_questions, answered, unanswered, correct, incorrect, percentage,
    difficulty, question_type, selected_subjects, subjects, question_ids
  ) values (
    '20000000-0000-0000-0000-000000000002', 'attempt-b', now(), now(), now(), 'manual',
    1, 1, 0, 0, 1, 0, 'iniciante', 'multiple-choice',
    array['historia'], array['historia'], array['vest-historia-001']
  )
$$, 'Conta B pode criar a própria tentativa');

select lives_ok($$
  insert into public.exam_answers (
    user_id, id, exam_id, question_id, selected_answer,
    is_correct, was_answered, marked_for_review, question_snapshot
  ) values (
    '20000000-0000-0000-0000-000000000002', 'attempt-b:vest-historia-001',
    'attempt-b', 'vest-historia-001', 'A', false, true, false,
    '{"statement":"Enunciado histórico","alternatives":[],"correctAnswer":"B"}'::jsonb
  )
$$, 'Conta B pode registrar resposta somente em sua tentativa');

select is(
  (select question_snapshot ->> 'statement'
   from public.exam_answers
   where id = 'attempt-b:vest-historia-001'),
  'Enunciado histórico',
  'snapshot da questão é persistido com a resposta'
);

select throws_ok($$
  insert into public.exam_answers (
    user_id, id, exam_id, question_id, selected_answer,
    is_correct, was_answered, marked_for_review
  ) values (
    '10000000-0000-0000-0000-000000000001', 'cross-account-answer',
    'attempt-a', 'vest-historia-002', 'A', false, true, false
  )
$$, 'new row violates row-level security policy for table "exam_answers"',
  'Conta B não pode gravar respostas em nome da Conta A');

reset role;
select * from finish();
rollback;
