import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync("supabase/migrations/20260928155803_teacher_content_activities_p2.sql", "utf8");
const actions = readFileSync("src/app/turmas/actions.ts", "utf8");
const teacherPage = readFileSync("src/app/professor/page.tsx", "utf8");
const activityPage = readFileSync("src/app/turmas/atividades/[activityId]/page.tsx", "utf8");

assert.match(migration, /add column archived_at timestamptz/, "questões devem suportar arquivamento");
assert.match(migration, /teacher_exam_status/, "simulado deve distinguir rascunho e publicado");
assert.match(migration, /teacher_activity_questions/, "atividade deve possuir snapshot próprio");
assert.match(migration, /attempt_number/, "atividade deve suportar múltiplas tentativas");
assert.match(migration, /activity_not_open/, "abertura deve ser validada no servidor");
assert.match(migration, /activity_closed/, "prazo deve ser validado no servidor");
assert.match(migration, /activity_attempt_limit_reached/, "limite de tentativas deve ser validado no servidor");
assert.match(migration, /md5\(al\.id::text/, "shuffle deve ser determinístico por tentativa");
assert.match(migration, /answer_policy/, "gabarito deve obedecer política da atividade");
assert.match(migration, /private\.can_assign_teacher_exam/, "atividade deve exigir turma e simulado do professor");
assert.match(actions, /duplicate_teacher_question/, "biblioteca deve duplicar questão");
assert.match(actions, /duplicate_teacher_exam/, "construtor deve duplicar simulado");
assert.match(teacherPage, /Biblioteca de questões/, "painel deve apresentar biblioteca pesquisável");
assert.match(teacherPage, /Construtor de simulados/, "painel deve apresentar construtor");
assert.match(actions, /start_teacher_activity_attempt/, "aluno deve iniciar tentativa protegida");
assert.match(activityPage, /get_teacher_attempt_questions/, "questões devem usar projeção segura por tentativa");
assert.match(activityPage, /get_teacher_attempt_result/, "gabarito deve vir da projeção protegida de resultado");
assert.doesNotMatch(`${actions}\n${activityPage}`, /daily_exam_usage|consume_daily_exam_generation_quota|exam_attempts/, "P2 não pode consumir cotas Student");
assert.doesNotMatch(activityPage, /teacher_activity_questions|teacher_question_snapshots/, "página do aluno não pode ler respostas diretamente das tabelas");

console.log("Professores P2: biblioteca, simulados, snapshots, tentativas, shuffle e políticas validados.");
