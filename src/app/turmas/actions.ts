"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safePath(value: string, fallback = "/turmas") {
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

const friendlyMessages: Record<string, string> = {
  teacher_active_class_limit_reached: "O Professor Free permite uma turma ativa por vez.",
  teacher_weekly_exam_limit_reached: "O Professor Free permite criar até dois simulados por semana.",
};

function friendlyMessage(message: string) {
  return friendlyMessages[message] ?? message;
}

function withMessage(path: string, message: string): never {
  const separator = path.includes("?") ? "&" : "?";
  redirect(`${path}${separator}mensagem=${encodeURIComponent(friendlyMessage(message))}`);
}

async function authenticated(returnTo: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return { supabase, user: data.user };
}

export async function activateTeacherAccount() {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("activate_teacher_account");
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Recursos de professor ativados na sua conta.");
}

export async function createTeacherClass(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { data, error } = await supabase.rpc("create_teacher_class", {
    p_name: text(formData, "name"),
    p_public_name: text(formData, "public_name"),
    p_description: text(formData, "description") || null,
    p_school_name: text(formData, "school_name") || null,
    p_subject: text(formData, "subject") || null,
    p_visibility: text(formData, "visibility") || "private",
  });
  if (error || !data) withMessage("/professor", error?.message ?? "Não foi possível criar a turma.");
  redirect(`/professor/turmas/${data}`);
}

export async function joinClassByCode(formData: FormData) {
  const returnTo = safePath(text(formData, "return_to") || "/turmas");
  const { supabase } = await authenticated(returnTo);
  const { data, error } = await supabase.rpc("join_teacher_class_by_code", {
    p_code: text(formData, "code"),
  });
  if (error || !data) withMessage(returnTo, error?.message ?? "Código de turma inválido.");
  revalidatePath("/turmas");
  withMessage(`/turmas/${data}`, "Solicitação enviada ao professor.");
}

export async function joinClassByToken(formData: FormData) {
  const token = text(formData, "token");
  const returnTo = `/turmas/entrar/${token}`;
  const { supabase } = await authenticated(returnTo);
  const { data, error } = await supabase.rpc("join_teacher_class_by_token", { p_token: token });
  if (error || !data) withMessage(returnTo, error?.message ?? "Link de turma inválido.");
  revalidatePath("/turmas");
  withMessage(`/turmas/${data}`, "Solicitação enviada ao professor.");
}

export async function requestClassJoin(formData: FormData) {
  const classId = text(formData, "class_id");
  const returnTo = `/turmas?busca=${encodeURIComponent(text(formData, "query"))}`;
  const { supabase } = await authenticated(returnTo);
  const { error } = await supabase.rpc("request_teacher_class_join", {
    p_class_id: classId,
  });
  if (error) withMessage(returnTo, error.message);
  revalidatePath("/turmas");
  withMessage(returnTo, "Solicitação enviada ao professor.");
}

export async function respondClassInvite(formData: FormData) {
  const { supabase } = await authenticated("/turmas");
  const { error } = await supabase.rpc("respond_teacher_class_invite", {
    p_invite_id: text(formData, "invite_id"),
    p_accept: text(formData, "decision") === "accept",
  });
  if (error) withMessage("/turmas", error.message);
  revalidatePath("/turmas");
  withMessage("/turmas", "Convite atualizado.");
}

export async function inviteToTeacherClass(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const { error } = await supabase.rpc("create_teacher_class_invite", {
    p_class_id: classId,
    p_identifier: text(formData, "identifier"),
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  withMessage(path, "Convite criado. Ele ficará disponível após o cadastro se o e-mail ainda não existir.");
}

export async function decideClassMember(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const { error } = await supabase.rpc("decide_teacher_class_member", {
    p_class_id: classId,
    p_user_id: text(formData, "user_id"),
    p_approve: text(formData, "decision") === "approve",
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  withMessage(path, "Solicitação atualizada.");
}

export async function removeClassMember(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const { error } = await supabase.rpc("remove_teacher_class_member", {
    p_class_id: classId,
    p_user_id: text(formData, "user_id"),
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  withMessage(path, "Aluno removido da turma.");
}

export async function regenerateClassAccess(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const { error } = await supabase.rpc("regenerate_teacher_class_access", {
    p_class_id: classId,
    p_kind: text(formData, "kind"),
    p_enabled: text(formData, "enabled") === "true",
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  withMessage(path, "Acesso da turma atualizado.");
}

export async function createTeacherExam(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("create_teacher_exam", {
    p_title: text(formData, "title"),
    p_description: text(formData, "description") || null,
    p_is_shared: text(formData, "is_shared") === "true",
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Simulado do professor criado.");
}

export async function createTeacherQuestion(formData: FormData) {
  const { supabase, user } = await authenticated("/professor");
  const type = text(formData, "question_type");
  const alternatives = text(formData, "alternatives");
  const { error } = await supabase.from("teacher_questions").insert({
    owner_id: user.id,
    visibility: text(formData, "visibility") || "private",
    statement: text(formData, "statement"),
    alternatives: alternatives ? alternatives.split("\n").map((item) => item.trim()).filter(Boolean) : null,
    correct_answer: text(formData, "correct_answer"),
    explanation: text(formData, "explanation") || null,
    subject: text(formData, "subject") || null,
    topic: text(formData, "topic") || null,
    difficulty: text(formData, "difficulty") || null,
    question_type: type,
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão criada.");
}

export async function addQuestionToTeacherExam(formData: FormData) {
  const examId = text(formData, "exam_id");
  const { supabase } = await authenticated("/professor");
  const { data: positions, error: positionError } = await supabase
    .from("teacher_exam_questions")
    .select("position")
    .eq("exam_id", examId)
    .order("position", { ascending: false })
    .limit(1);
  if (positionError) withMessage("/professor", positionError.message);
  const { error } = await supabase.from("teacher_exam_questions").insert({
    exam_id: examId,
    position: (positions?.[0]?.position ?? 0) + 1,
    teacher_question_id: text(formData, "question_id"),
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão adicionada ao simulado.");
}

export async function createClassActivity(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase, user } = await authenticated(path);
  const { error } = await supabase.from("teacher_class_activities").insert({
    class_id: classId,
    exam_id: text(formData, "exam_id"),
    assigned_by: user.id,
    title: text(formData, "title"),
    instructions: text(formData, "instructions") || null,
    status: "published",
    due_at: text(formData, "due_at") || null,
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  withMessage(path, "Atividade publicada para a turma.");
}

export async function submitClassActivity(formData: FormData) {
  const activityId = text(formData, "activity_id");
  const path = `/turmas/atividades/${activityId}`;
  const { supabase } = await authenticated(path);
  const answers = Object.fromEntries(
    [...formData.entries()]
      .filter(([key]) => key.startsWith("question_"))
      .map(([key, value]) => [key.slice("question_".length), String(value)]),
  );
  const { data, error } = await supabase.rpc("submit_teacher_activity", { p_activity_id: activityId, p_answers: answers });
  if (error || !data?.[0]) withMessage(path, error?.message ?? "Não foi possível salvar a atividade.");
  const result = data[0] as { correct_count: number; total_questions: number };
  revalidatePath(path);
  withMessage(path, `Atividade concluída: ${result.correct_count} de ${result.total_questions} acertos.`);
}
