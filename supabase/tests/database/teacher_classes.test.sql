begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
grant usage on schema extensions to authenticated;
select plan(29);

select ok(
  (select count(*)=11 and bool_and(c.relrowsecurity)
   from pg_class c join pg_namespace n on n.oid=c.relnamespace
   where n.nspname='public' and c.relname=any(array[
    'teacher_plan_limits','teacher_accounts','teacher_classes','teacher_class_members',
    'teacher_class_invites','teacher_questions','teacher_exams','teacher_exam_questions',
    'teacher_class_activities','teacher_activity_attempts','teacher_activity_answers'
   ])),
  'RLS habilitado em todas as tabelas de Professores'
);
select ok(not has_table_privilege('anon','public.teacher_classes','select'),'anon não lê registros completos da turma');
select ok(has_function_privilege('anon','public.search_teacher_classes(text)','execute'),'anon pesquisa somente projeção pública segura');
select ok(not has_function_privilege('anon','public.create_teacher_class(text,text,text,text,text,teacher_class_visibility)','execute'),'anon não cria turma');
select ok(not has_table_privilege('authenticated','public.teacher_class_members','insert'),'aluno não insere matrícula diretamente');
select ok(not has_table_privilege('authenticated','public.teacher_class_invites','insert'),'convite só nasce por RPC protegida');
select ok(not has_table_privilege('authenticated','public.teacher_accounts','update'),'plano de professor não pode ser elevado pelo cliente');
select ok(not has_column_privilege('authenticated','public.teacher_questions','correct_answer','select'),'resposta correta não é exposta pela Data API');
select ok(not has_table_privilege('authenticated','public.teacher_activity_attempts','update'),'aluno não altera a própria nota diretamente');
select ok(not has_column_privilege('authenticated','public.teacher_classes','status','update'),'status da turma só muda por RPC com limite do plano');

insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values
('00000000-0000-0000-0000-000000000000','51000000-0000-0000-0000-000000000001','authenticated','authenticated','teacher@nabulab.test',crypt('teacher',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Professora Livia","username":"prof-livia"}',now(),now()),
('00000000-0000-0000-0000-000000000000','52000000-0000-0000-0000-000000000002','authenticated','authenticated','student@nabulab.test',crypt('student',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Aluno Teste","username":"aluno-teste"}',now(),now()),
('00000000-0000-0000-0000-000000000000','53000000-0000-0000-0000-000000000003','authenticated','authenticated','outsider@nabulab.test',crypt('outsider',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Terceiro","username":"terceiro"}',now(),now());

set local role authenticated;
select set_config('request.jwt.claim.sub','51000000-0000-0000-0000-000000000001',true);
select lives_ok($$select public.activate_teacher_account()$$,'mesma conta ativa recursos de professor');
select is((select plan::text from public.teacher_accounts where user_id=(select auth.uid())),'free','ativação começa no Professor Free');

create temporary table created_class(id uuid);
insert into created_class select public.create_teacher_class('9 A','Matemática — 9º A','Turma de testes','Escola X','Matemática','public_approval');
select is((select count(*)::integer from public.teacher_classes where owner_id=(select auth.uid())),1,'Professor Free cria primeira turma');
select throws_ok($$select public.create_teacher_class('9 B','Matemática — 9º B',null,null,'Matemática','private')$$,'teacher_active_class_limit_reached','Professor Free não burla limite de uma turma');

select lives_ok($$select public.create_teacher_exam('Avaliação 1',null,true)$$,'primeiro simulado semanal e compartilhamento permitido');
select lives_ok($$select public.create_teacher_exam('Avaliação 2',null,false)$$,'segundo simulado semanal permitido');
select throws_ok($$select public.create_teacher_exam('Avaliação 3',null,false)$$,'teacher_weekly_exam_limit_reached','terceiro simulado semanal é bloqueado no banco');

select set_config('request.jwt.claim.sub','53000000-0000-0000-0000-000000000003',true);
select is((select count(*)::integer from public.teacher_classes),0,'terceiro não acessa turma nem dados privados');

select set_config('request.jwt.claim.sub','52000000-0000-0000-0000-000000000002',true);
select lives_ok(format('select public.request_teacher_class_join(%L::uuid)',(select id from created_class)),'aluno solicita entrada sem autoaprovação');
select is((select status::text from public.teacher_class_members where user_id=(select auth.uid())),'pending','solicitação permanece pendente');
select throws_ok(format('select public.decide_teacher_class_member(%L::uuid,%L::uuid,true)',(select id from created_class),'52000000-0000-0000-0000-000000000002'),'class_owner_required','aluno não aprova a própria solicitação');

select set_config('request.jwt.claim.sub','51000000-0000-0000-0000-000000000001',true);
select lives_ok(format('select public.decide_teacher_class_member(%L::uuid,%L::uuid,true)',(select id from created_class),'52000000-0000-0000-0000-000000000002'),'somente professor aprova a matrícula');
select is((select count(*)::integer from public.profiles where id='52000000-0000-0000-0000-000000000002'),0,'professor não recebe acesso direto ao perfil ou e-mail do aluno');
select is((select count(*)::integer from public.get_teacher_class_members((select id from created_class))),1,'professor recebe somente a projeção segura dos membros');

select set_config('request.jwt.claim.sub','52000000-0000-0000-0000-000000000002',true);
select lives_ok(format('select public.request_teacher_class_join(%L::uuid)',(select id from created_class)),'nova solicitação de membro ativo não reduz a matrícula');
select is((select status::text from public.teacher_class_members where user_id=(select auth.uid())),'active','membro ativo permanece ativo');

select set_config('request.jwt.claim.sub','51000000-0000-0000-0000-000000000001',true);

insert into public.teacher_questions(owner_id,statement,alternatives,correct_answer,question_type)
values((select auth.uid()),'Quanto é dois mais dois?','["3","4","5"]'::jsonb,'"4"'::jsonb,'multiple_choice');
insert into public.teacher_exam_questions(exam_id,position,teacher_question_id)
select e.id,1,q.id from public.teacher_exams e cross join public.teacher_questions q where e.owner_id=(select auth.uid()) order by e.created_at limit 1;

insert into public.teacher_class_activities(class_id,exam_id,assigned_by,title,status)
select (select id from created_class),e.id,(select auth.uid()),'Atividade da turma','published' from public.teacher_exams e where e.owner_id=(select auth.uid()) order by created_at limit 1;

select set_config('request.jwt.claim.sub','52000000-0000-0000-0000-000000000002',true);
select lives_ok(format('select * from public.submit_teacher_activity(%L::uuid,%L::jsonb)',(select id from public.teacher_class_activities limit 1),'{"1":"4"}'),'aluno envia atividade pelo RPC sem escrever a própria nota');
select is((select count(*)::integer from public.daily_exam_usage where user_id=(select auth.uid())),0,'atividade do professor não consome quota Student');
select is((select count(*)::integer from public.exam_attempts where user_id=(select auth.uid())),0,'atividade da turma não se mistura ao histórico pessoal');

reset role;
select * from finish();
rollback;
