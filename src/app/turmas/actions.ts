"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNabuNotificationEmail } from "@/lib/notifications-email";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safePath(value: string, fallback = "/turmas") {
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

const friendlyMessages: Record<string, string> = {
  teacher_active_class_limit_reached: "Você atingiu o limite de turmas ativas do seu plano. Consulte os planos Professor para ampliar a capacidade.",
  teacher_weekly_exam_limit_reached: "Você atingiu o limite semanal de simulados do seu plano. Consulte os planos Professor para ampliar a capacidade.",
  teacher_class_student_limit_reached: "Esta turma atingiu o limite de alunos do plano atual.",
};

function friendlyMessage(message: string) {
  return friendlyMessages[message] ?? message;
}

async function recordTeacherLimit(userId: string, message: string, resource: string) {
  if (!Object.hasOwn(friendlyMessages, message)) return;
  await recordAuthenticatedAnalyticsEvent("teacher_limit_reached", userId, {
    properties: { reason: message, resource },
  });
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
  const { supabase, user } = await authenticated("/professor");
  const { data, error } = await supabase.rpc("create_teacher_class", {
    p_name: text(formData, "name"),
    p_public_name: text(formData, "public_name"),
    p_description: text(formData, "description") || null,
    p_school_name: text(formData, "school_name") || null,
    p_subject: text(formData, "subject") || null,
    p_visibility: text(formData, "visibility") || "private",
  });
  if (error) await recordTeacherLimit(user.id, error.message, "class");
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
  const admin=createAdminClient();
  const {data:room}=await admin.from("teacher_classes").select("owner_id,public_name").eq("id",classId).maybeSingle();
  if(room) await sendNabuNotificationEmail({dedupeKey:`join-request:${classId}:${(await supabase.auth.getUser()).data.user?.id}`,category:"classes",recipientUserId:room.owner_id,subject:"Nova solicitação de entrada",heading:"Solicitação aguardando aprovação",body:`Um aluno quer entrar em ${room.public_name}.`,actionLabel:"Revisar solicitação",actionPath:`/professor/turmas/${classId}#solicitacoes`});
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
  const identifier=text(formData,"identifier").replace(/^@/,"").toLowerCase();
  const admin=createAdminClient();
  const {data:invite}=await admin.from("teacher_class_invites").select("id,invitee_user_id,email,teacher_classes(public_name)").eq("class_id",classId).eq("status","pending").order("created_at",{ascending:false}).limit(1).maybeSingle();
  if(invite){const related=invite.teacher_classes as unknown as {public_name:string}|null; await sendNabuNotificationEmail({dedupeKey:`class-invite:${invite.id}`,category:"classes",recipientUserId:invite.invitee_user_id,recipientEmail:invite.email??(identifier.includes("@")?identifier:null),subject:"Convite para uma turma no NabuLab",heading:"Você recebeu um convite",body:`Você foi convidado para ${related?.public_name??"uma turma"}.`,actionLabel:"Ver convite",actionPath:"/turmas"});}
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

export async function updateTeacherClassSettings(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const { error } = await supabase.rpc("update_teacher_class_settings", {
    p_class_id: classId,
    p_name: text(formData, "name"),
    p_public_name: text(formData, "public_name"),
    p_description: text(formData, "description"),
    p_school_name: text(formData, "school_name"),
    p_subject: text(formData, "subject"),
    p_visibility: text(formData, "visibility"),
  });
  if (error) withMessage(path, error.message);
  revalidatePath(path);
  revalidatePath("/professor");
  revalidatePath("/turmas");
  withMessage(path, "Configurações da turma salvas.");
}

export async function createTeacherExam(formData: FormData) {
  const { supabase, user } = await authenticated("/professor");
  const { error } = await supabase.rpc("create_teacher_exam", {
    p_title: text(formData, "title"),
    p_description: text(formData, "description") || null,
    p_is_shared: text(formData, "is_shared") === "true",
  });
  if (error) await recordTeacherLimit(user.id, error.message, "exam");
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Simulado do professor criado.");
}

export async function duplicateTeacherQuestion(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("duplicate_teacher_question", { p_question_id: text(formData, "question_id") });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão duplicada como um novo item independente.");
}

export async function setTeacherQuestionArchived(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const archived = text(formData, "archived") === "true";
  const { error } = await supabase.rpc("set_teacher_question_archived", {
    p_question_id: text(formData, "question_id"), p_archived: archived,
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", archived ? "Questão arquivada." : "Questão restaurada.");
}

export async function duplicateTeacherExam(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("duplicate_teacher_exam", { p_exam_id: text(formData, "exam_id") });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Simulado duplicado como rascunho.");
}

export async function setTeacherExamStatus(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("set_teacher_exam_status", {
    p_exam_id: text(formData, "exam_id"), p_status: text(formData, "status"),
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", text(formData, "status") === "published" ? "Simulado publicado." : "Simulado voltou para rascunho.");
}

export async function removeQuestionFromTeacherExam(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("remove_teacher_exam_question", {
    p_exam_id: text(formData, "exam_id"), p_position: Number(text(formData, "position")),
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão removida do simulado.");
}

export async function moveQuestionInTeacherExam(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("move_teacher_exam_question", {
    p_exam_id: text(formData, "exam_id"), p_position: Number(text(formData, "position")), p_direction: Number(text(formData, "direction")),
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Ordem do simulado atualizada.");
}

export async function createTeacherQuestion(formData: FormData) {
  const { supabase } = await authenticated("/professor");
  const type = text(formData, "question_type");
  const alternatives = text(formData, "alternatives").split("\n").map((item) => item.trim()).filter(Boolean);
  const { error } = await supabase.rpc("create_owned_teacher_question", {
    p_statement: text(formData, "statement"), p_alternatives: type === "multiple_choice" ? alternatives : null,
    p_correct_answer: text(formData, "correct_answer"), p_explanation: text(formData, "explanation"),
    p_subject: text(formData, "subject"), p_topic: text(formData, "topic"), p_difficulty: text(formData, "difficulty") || null,
    p_question_type: type, p_visibility: text(formData, "visibility") || "private",
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão criada.");
}

export async function updateTeacherQuestion(formData: FormData) {
  const questionId = text(formData, "question_id");
  const { supabase } = await authenticated("/professor");
  const questionType = text(formData, "question_type");
  const visibility = text(formData, "visibility");
  const difficulty = text(formData, "difficulty");
  const correctAnswer = text(formData, "correct_answer");
  const alternatives = text(formData, "alternatives").split("\n").map((item) => item.trim()).filter(Boolean);

  if (!['multiple_choice', 'true_false'].includes(questionType)) withMessage("/professor", "Tipo de questão inválido.");
  if (!['private', 'shared'].includes(visibility)) withMessage("/professor", "Visibilidade inválida.");
  if (difficulty && !['iniciante', 'medio', 'avancado'].includes(difficulty)) withMessage("/professor", "Dificuldade inválida.");
  if (questionType === "multiple_choice" && (alternatives.length < 2 || !alternatives.includes(correctAnswer))) {
    withMessage("/professor", "A resposta correta precisa corresponder a uma das alternativas.");
  }
  if (questionType === "true_false" && !['verdadeiro', 'falso', 'true', 'false'].includes(correctAnswer.toLowerCase())) {
    withMessage("/professor", "Em V/F, use Verdadeiro ou Falso como resposta correta.");
  }

  const { error } = await supabase.rpc("update_owned_teacher_question", {
    p_question_id: questionId,p_visibility: visibility,p_statement: text(formData,"statement"),
    p_alternatives: questionType === "multiple_choice" ? alternatives : null,p_correct_answer: correctAnswer,
    p_explanation: text(formData,"explanation"),p_subject: text(formData,"subject"),p_topic: text(formData,"topic"),
    p_difficulty: difficulty || null,p_question_type: questionType,
  });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão atualizada. Simulados existentes mantiveram a versão anterior.");
}

export async function addQuestionToTeacherExam(formData: FormData) {
  const examId = text(formData, "exam_id");
  const { supabase } = await authenticated("/professor");
  const { error } = await supabase.rpc("add_teacher_exam_question", { p_exam_id: examId, p_question_id: text(formData, "question_id") });
  if (error) withMessage("/professor", error.message);
  revalidatePath("/professor");
  withMessage("/professor", "Questão adicionada ao simulado.");
}

export async function createClassActivity(formData: FormData) {
  const classId = text(formData, "class_id");
  const path = `/professor/turmas/${classId}`;
  const { supabase } = await authenticated(path);
  const attempts = text(formData, "max_attempts");
  const { error } = await supabase.rpc("create_teacher_activity", {
    p_class_id: classId,
    p_exam_id: text(formData, "exam_id"),
    p_title: text(formData, "title"),
    p_instructions: text(formData, "instructions") || null,
    p_available_from: text(formData, "available_from") || null,
    p_due_at: text(formData, "due_at") || null,
    p_max_attempts: attempts === "unlimited" ? null : Number(attempts || "1"),
    p_shuffle_questions: text(formData, "shuffle_questions") === "true",
    p_shuffle_alternatives: text(formData, "shuffle_alternatives") === "true",
    p_show_score: text(formData, "show_score") === "true",
    p_answer_policy: text(formData, "answer_policy") || "never",
  });
  if (error) withMessage(path, error.message);
  const admin=createAdminClient();
  const {data:activity}=await admin.from("teacher_class_activities").select("id,title,due_at").eq("class_id",classId).order("created_at",{ascending:false}).limit(1).maybeSingle();
  const {data:members}=await admin.from("teacher_class_members").select("user_id").eq("class_id",classId).eq("status","active");
  if(activity) await Promise.allSettled((members??[]).map(member=>sendNabuNotificationEmail({dedupeKey:`activity-published:${activity.id}:${member.user_id}`,category:"activities",recipientUserId:member.user_id,subject:"Nova atividade disponível",heading:"Nova atividade disponível",body:`Seu professor publicou “${activity.title}”.${activity.due_at?` Prazo: ${new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date(activity.due_at))}.`:""}`,actionLabel:"Ver atividade",actionPath:`/turmas/atividades/${activity.id}`})));
  revalidatePath(path);
  withMessage(path, "Atividade publicada para a turma.");
}

export async function startClassActivity(formData: FormData) {
  const activityId = text(formData, "activity_id");
  const path = `/turmas/atividades/${activityId}`;
  const { supabase } = await authenticated(path);
  const { data, error } = await supabase.rpc("start_teacher_activity_attempt", { p_activity_id: activityId });
  if (error || !data) withMessage(path, error?.message ?? "Não foi possível iniciar a tentativa.");
  redirect(`${path}?attempt=${data}`);
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
  const attemptId = text(formData, "attempt_id");
  const { data, error } = await supabase.rpc("submit_teacher_activity_attempt", { p_attempt_id: attemptId, p_answers: answers });
  if (error || !data?.[0]) withMessage(path, error?.message ?? "Não foi possível salvar a atividade.");
  const result = data[0] as { correct_count: number; total_questions: number };
  revalidatePath(path);
  withMessage(path, `Atividade concluída: ${result.correct_count} de ${result.total_questions} acertos.`);
}
