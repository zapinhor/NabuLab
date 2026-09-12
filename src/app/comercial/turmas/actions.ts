"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function classRedirect(classId: string, message: string): never {
  redirect(
    `/comercial/turmas/${classId}?mensagem=${encodeURIComponent(message)}`,
  );
}

async function authenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) redirect("/login");
  return supabase;
}

export async function addStudentToClass(formData: FormData) {
  const classId = value(formData, "class_id");
  const supabase = await authenticatedClient();
  const { error } = await supabase.rpc("add_institution_student_to_class", {
    p_class_id: classId,
    p_student_id: value(formData, "student_id"),
  });
  if (error) classRedirect(classId, error.message);
  revalidatePath(`/comercial/turmas/${classId}`);
  classRedirect(classId, "Aluno adicionado à turma.");
}

export async function inviteStudentToClass(formData: FormData) {
  const classId = value(formData, "class_id");
  const supabase = await authenticatedClient();
  const { error } = await supabase.rpc("create_class_invite", {
    p_class_id: classId,
    p_identifier: value(formData, "identifier").toLowerCase(),
  });
  if (error) classRedirect(classId, error.message);
  revalidatePath(`/comercial/turmas/${classId}`);
  classRedirect(classId, "Convite criado ou reemitido por 7 dias.");
}

export async function removeStudentFromClass(formData: FormData) {
  const classId = value(formData, "class_id");
  const supabase = await authenticatedClient();
  const { error } = await supabase.rpc("remove_student_from_class", {
    p_class_id: classId,
    p_student_id: value(formData, "student_id"),
  });
  if (error) classRedirect(classId, error.message);
  revalidatePath(`/comercial/turmas/${classId}`);
  classRedirect(classId, "Aluno removido somente desta turma.");
}

export async function revokeClassInvite(formData: FormData) {
  const classId = value(formData, "class_id");
  const supabase = await authenticatedClient();
  const { error } = await supabase.rpc("revoke_class_invite", {
    p_invite_id: value(formData, "invite_id"),
  });
  if (error) classRedirect(classId, error.message);
  revalidatePath(`/comercial/turmas/${classId}`);
  classRedirect(classId, "Convite revogado.");
}

export async function setClassArchived(formData: FormData) {
  const classId = value(formData, "class_id");
  const archived = value(formData, "archived") === "true";
  const supabase = await authenticatedClient();
  const { error } = await supabase.rpc("set_class_archived", {
    p_class_id: classId,
    p_archived: archived,
  });
  if (error) classRedirect(classId, error.message);
  revalidatePath("/comercial");
  revalidatePath(`/comercial/turmas/${classId}`);
  classRedirect(classId, archived ? "Turma arquivada." : "Turma restaurada.");
}
