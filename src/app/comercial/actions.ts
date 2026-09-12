"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function commercialRedirect(message: string, organizationId?: string): never {
  const params = new URLSearchParams({ mensagem: message });
  if (organizationId) params.set("org", organizationId);
  redirect(`/comercial?${params.toString()}`);
}

async function authenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (error || !userId) redirect("/login");
  return { supabase, userId };
}

export async function createOrganization(formData: FormData) {
  const { supabase } = await authenticatedClient();
  const { data, error } = await supabase.rpc("create_organization", {
    p_name: value(formData, "name"),
    p_slug: value(formData, "slug").toLowerCase(),
    p_kind: value(formData, "kind"),
    p_logo_url: value(formData, "logo_url") || null,
    p_primary_color: value(formData, "primary_color"),
    p_accent_color: value(formData, "accent_color"),
  });
  if (error) commercialRedirect(error.message);
  revalidatePath("/comercial");
  commercialRedirect("Instituição criada. Agora convide o primeiro Diretor.", String(data));
}

export async function updateBranding(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("update_organization_branding", {
    p_organization_id: organizationId,
    p_logo_url: value(formData, "logo_url"),
    p_primary_color: value(formData, "primary_color"),
    p_accent_color: value(formData, "accent_color"),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Identidade visual atualizada.", organizationId);
}

export async function inviteCollaborator(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("create_organization_invite", {
    p_organization_id: organizationId,
    p_email: value(formData, "email").toLowerCase(),
    p_role: value(formData, "role"),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Convite de colaborador criado com validade de 7 dias.", organizationId);
}

export async function respondOrganizationInvite(formData: FormData) {
  const { supabase } = await authenticatedClient();
  const accept = value(formData, "decision") === "accept";
  const { data, error } = await supabase.rpc("respond_organization_invite", {
    p_invite_id: value(formData, "invite_id"),
    p_accept: accept,
  });
  if (error) commercialRedirect(error.message);
  revalidatePath("/comercial");
  commercialRedirect(accept ? "Convite aceito." : "Convite recusado.", String(data));
}

export async function revokeOrganizationInvite(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("revoke_organization_invite", {
    p_invite_id: value(formData, "invite_id"),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Convite revogado.", organizationId);
}

export async function revokeOrganizationMember(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("revoke_organization_member", {
    p_organization_id: organizationId,
    p_user_id: value(formData, "user_id"),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Acesso do membro revogado.", organizationId);
}

export async function createClass(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase, userId } = await authenticatedClient();
  const academicYear = Number(value(formData, "academic_year"));
  const { error } = await supabase.from("classes").insert({
    organization_id: organizationId,
    name: value(formData, "name"),
    description: value(formData, "description") || null,
    academic_year: Number.isInteger(academicYear) ? academicYear : null,
    created_by: userId,
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Turma criada.", organizationId);
}

export async function addInstitutionStudent(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("add_institution_student_to_class", {
    p_class_id: value(formData, "class_id"),
    p_student_id: value(formData, "student_id"),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Aluno adicionado à turma.", organizationId);
}

export async function inviteExternalStudent(formData: FormData) {
  const organizationId = value(formData, "organization_id");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.rpc("create_class_invite", {
    p_class_id: value(formData, "class_id"),
    p_identifier: value(formData, "identifier").toLowerCase(),
  });
  if (error) commercialRedirect(error.message, organizationId);
  revalidatePath("/comercial");
  commercialRedirect("Convite de aluno criado. Ele já aparece na conta do destinatário.", organizationId);
}

export async function respondClassInvite(formData: FormData) {
  const { supabase } = await authenticatedClient();
  const accept = value(formData, "decision") === "accept";
  const { error } = await supabase.rpc("respond_class_invite", {
    p_invite_id: value(formData, "invite_id"),
    p_accept: accept,
  });
  if (error) commercialRedirect(error.message);
  revalidatePath("/comercial");
  commercialRedirect(accept ? "Turma adicionada à sua conta." : "Convite de turma recusado.");
}
