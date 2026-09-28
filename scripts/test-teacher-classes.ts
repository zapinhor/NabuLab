import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync("supabase/migrations/20260927154011_teacher_classes_foundation.sql", "utf8");
const actions = readFileSync("src/app/turmas/actions.ts", "utf8");

const expectedTables = [
  "teacher_accounts",
  "teacher_classes",
  "teacher_class_members",
  "teacher_class_invites",
  "teacher_questions",
  "teacher_exams",
  "teacher_exam_questions",
  "teacher_class_activities",
  "teacher_activity_attempts",
  "teacher_activity_answers",
];

for (const table of expectedTables) {
  assert.match(migration, new RegExp(`create table public\\.${table}\\b`), `${table} deve existir`);
  assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`), `${table} deve usar RLS`);
}

assert.match(migration, /\('free',\s*1,\s*40,\s*2,/, "Professor Free deve manter 1 turma, 40 alunos e 2 simulados semanais");
assert.match(migration, /for update;[\s\S]*teacher_active_class_limit_reached/, "limite de turmas deve ser serializado no banco");
assert.match(migration, /for update;[\s\S]*teacher_weekly_exam_limit_reached/, "limite semanal deve ser serializado no banco");
assert.match(migration, /private_class_invite_only/, "turma privada deve aceitar somente convite");
assert.match(migration, /preview_teacher_class_by_token/, "link deve expor somente uma prévia pública segura");
assert.doesNotMatch(actions, /consume_daily_exam_generation_quota|daily_exam_usage|exam_attempts/, "atividade de turma não pode consumir cotas ou histórico Student");
assert.match(actions, /submit_teacher_activity/, "envio deve usar RPC protegido para calcular a nota");
assert.match(migration, /insert into public\.teacher_activity_attempts/, "atividade deve usar tentativas próprias do domínio de turmas");
assert.doesNotMatch(migration, /grant insert,update on public\.teacher_activity_attempts/, "aluno não recebe escrita direta na própria nota");
assert.doesNotMatch(migration, /request_teacher_class_join\(p_class_id uuid,\s*p_source/, "origem da solicitação não pode ser escolhida pelo cliente");

console.log("Professores + Turmas: domínio separado, limites Free e contratos de RLS validados.");
