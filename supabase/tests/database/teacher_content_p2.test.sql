begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
select plan(21);

insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values
('00000000-0000-0000-0000-000000000000','61000000-0000-0000-0000-000000000001','authenticated','authenticated','p2-teacher@nabulab.test',crypt('teacher',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Professor P2","username":"prof-p2"}',now(),now()),
('00000000-0000-0000-0000-000000000000','62000000-0000-0000-0000-000000000002','authenticated','authenticated','p2-student@nabulab.test',crypt('student',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Aluno P2","username":"aluno-p2"}',now(),now()),
('00000000-0000-0000-0000-000000000000','63000000-0000-0000-0000-000000000003','authenticated','authenticated','p2-other@nabulab.test',crypt('other',gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{"full_name":"Outro Professor","username":"outro-p2"}',now(),now());

set local role authenticated;
select set_config('request.jwt.claim.sub','61000000-0000-0000-0000-000000000001',true);
select public.activate_teacher_account();
create temporary table p2_ids(kind text primary key,id uuid);
insert into p2_ids values ('class',public.create_teacher_class('P2','Turma P2',null,null,'Física','public_approval'));
insert into public.teacher_questions(owner_id,statement,alternatives,correct_answer,explanation,subject,topic,difficulty,question_type)
values((select auth.uid()),'Qual é a unidade de força?','["newton","joule","watt"]','"newton"','Força é medida em newtons.','Física','Dinâmica','iniciante','multiple_choice') returning id;
insert into p2_ids select 'question',id from public.teacher_questions where owner_id=(select auth.uid());
insert into p2_ids values ('exam',public.create_teacher_exam('Simulado P2',null,false));
insert into public.teacher_exam_questions(exam_id,position,teacher_question_id) select (select id from p2_ids where kind='exam'),1,(select id from p2_ids where kind='question');

select lives_ok(format('select public.duplicate_teacher_question(%L)',(select id from p2_ids where kind='question')),'questão pode ser duplicada');
select is((select count(*)::integer from public.teacher_questions where owner_id=(select auth.uid())),2,'duplicação cria item independente');
select lives_ok(format('select public.set_teacher_question_archived(%L,true)',(select id from p2_ids where kind='question')),'questão pode ser arquivada');
select ok((select archived_at is not null from public.teacher_questions where id=(select id from p2_ids where kind='question')),'arquivamento é persistido');
select lives_ok(format('select public.set_teacher_question_archived(%L,false)',(select id from p2_ids where kind='question')),'questão pode ser restaurada');
select lives_ok(format('select public.set_teacher_exam_status(%L,''published'')',(select id from p2_ids where kind='exam')),'simulado com questão pode ser publicado');
select throws_ok(format('insert into public.teacher_exam_questions(exam_id,position,teacher_question_id) values(%L,2,%L)',(select id from p2_ids where kind='exam'),(select id from p2_ids where kind='question')),'published_exam_requires_draft_copy','composição publicada não muda diretamente');
select lives_ok(format('select public.duplicate_teacher_exam(%L)',(select id from p2_ids where kind='exam')),'simulado pode ser duplicado');
select is((select status::text from public.teacher_exams where title='Simulado P2 — cópia'),'draft','cópia nasce em rascunho');

select set_config('request.jwt.claim.sub','62000000-0000-0000-0000-000000000002',true);
select public.request_teacher_class_join((select id from p2_ids where kind='class'));
select set_config('request.jwt.claim.sub','61000000-0000-0000-0000-000000000001',true);
select public.decide_teacher_class_member((select id from p2_ids where kind='class'),'62000000-0000-0000-0000-000000000002',true);
insert into p2_ids values ('activity',public.create_teacher_activity((select id from p2_ids where kind='class'),(select id from p2_ids where kind='exam'),'Atividade P2',null,null,now()+interval '1 day',2,true,true,true,'immediate'));
select is((select count(*)::integer from public.teacher_activity_questions where activity_id=(select id from p2_ids where kind='activity')),1,'atividade recebe snapshot próprio');

update public.teacher_questions set statement='Texto alterado depois' where id=(select id from p2_ids where kind='question');
select is((select question_snapshot->>'statement' from public.teacher_activity_questions where activity_id=(select id from p2_ids where kind='activity')),'Qual é a unidade de força?','atividade não muda retroativamente');

select set_config('request.jwt.claim.sub','62000000-0000-0000-0000-000000000002',true);
insert into p2_ids values ('attempt1',public.start_teacher_activity_attempt((select id from p2_ids where kind='activity')));
select is(
  (select jsonb_agg(to_jsonb(q) order by q.display_position) from public.get_teacher_attempt_questions((select id from p2_ids where kind='attempt1')) q),
  (select jsonb_agg(to_jsonb(q) order by q.display_position) from public.get_teacher_attempt_questions((select id from p2_ids where kind='attempt1')) q),
  'ordem permanece estável na mesma tentativa'
);
select lives_ok(format('select * from public.submit_teacher_activity_attempt(%L,''{"1":"newton"}''::jsonb)',(select id from p2_ids where kind='attempt1')),'primeira tentativa é corrigida no servidor');
insert into p2_ids values ('attempt2',public.start_teacher_activity_attempt((select id from p2_ids where kind='activity')));
select lives_ok(format('select * from public.submit_teacher_activity_attempt(%L,''{"1":"newton"}''::jsonb)',(select id from p2_ids where kind='attempt2')),'segunda tentativa permitida');
select throws_ok(format('select public.start_teacher_activity_attempt(%L)',(select id from p2_ids where kind='activity')),'activity_attempt_limit_reached','terceira tentativa é bloqueada');
select ok((select answers is not null from public.get_teacher_attempt_result((select id from p2_ids where kind='attempt2'))),'gabarito imediato aparece somente após envio');
select is((select count(*)::integer from public.daily_exam_usage where user_id=(select auth.uid())),0,'atividade não consome quota Student');
select is((select count(*)::integer from public.exam_attempts where user_id=(select auth.uid())),0,'atividade não cria tentativa Student');

select set_config('request.jwt.claim.sub','61000000-0000-0000-0000-000000000001',true);
insert into p2_ids values ('scheduled',public.create_teacher_activity((select id from p2_ids where kind='class'),(select id from p2_ids where kind='exam'),'Agendada',null,now()+interval '1 day',now()+interval '2 days',1,false,false,true,'never'));
select set_config('request.jwt.claim.sub','62000000-0000-0000-0000-000000000002',true);
select throws_ok(format('select public.start_teacher_activity_attempt(%L)',(select id from p2_ids where kind='scheduled')),'activity_not_open','atividade agendada é bloqueada no backend');

select set_config('request.jwt.claim.sub','63000000-0000-0000-0000-000000000003',true);
select public.activate_teacher_account();
select throws_ok(format('select public.duplicate_teacher_exam(%L)',(select id from p2_ids where kind='exam')),'exam_owner_required','outro professor não duplica simulado privado');
select ok(not has_table_privilege('authenticated','public.teacher_activity_questions','select'),'snapshots de atividade não são expostos pela Data API');

reset role;
select * from finish();
rollback;
