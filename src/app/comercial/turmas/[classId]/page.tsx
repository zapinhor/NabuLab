import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { roleLabel } from "@/lib/commercial/labels";
import { createClient } from "@/lib/supabase/server";
import {
  addStudentToClass,
  inviteStudentToClass,
} from "@/app/comercial/turmas/actions";
import {
  ArchiveClassForm,
  RemoveStudentForm,
  RevokeClassInviteForm,
} from "@/components/commercial/class-action-forms";

type ClassRoom = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  academic_year: number | null;
  created_by: string;
  is_archived: boolean;
};
type Organization = { id: string; name: string; slug: string };
type Membership = { organization_id: string; user_id: string; role: string };
type ClassMember = {
  class_id: string;
  user_id: string;
  status: string;
  joined_at: string;
};
type Profile = {
  id: string;
  full_name: string;
  email: string;
  username: string | null;
};
type ClassInvite = { id: string; email: string | null; expires_at: string };

const fieldClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm";
const primaryButton =
  "rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800";

export const dynamic = "force-dynamic";

export default async function ClassPage({
  params,
  searchParams,
}: PageProps<"/comercial/turmas/[classId]">) {
  const { classId } = await params;
  const { mensagem } = await searchParams;
  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select(
      "id,organization_id,name,description,academic_year,created_by,is_archived",
    )
    .eq("id", classId)
    .single();
  if (classError || !classData) notFound();
  const classRoom = classData as ClassRoom;

  const [
    organizationResult,
    membershipResult,
    adminResult,
    memberResult,
    inviteResult,
    organizationMemberResult,
  ] = await Promise.all([
    supabase
      .from("organizations")
      .select("id,name,slug")
      .eq("id", classRoom.organization_id)
      .single(),
    supabase
      .from("organization_members")
      .select("organization_id,user_id,role")
      .eq("organization_id", classRoom.organization_id)
      .eq("user_id", userId)
      .maybeSingle(),
    supabase.rpc("is_super_admin"),
    supabase
      .from("class_members")
      .select("class_id,user_id,status,joined_at")
      .eq("class_id", classId)
      .eq("status", "active")
      .order("joined_at"),
    supabase
      .from("class_invites")
      .select("id,email,expires_at")
      .eq("class_id", classId)
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase
      .from("organization_members")
      .select("user_id,role")
      .eq("organization_id", classRoom.organization_id)
      .eq("role", "student"),
  ]);

  const organization = organizationResult.data as Organization | null;
  const membership = membershipResult.data as Membership | null;
  const classMembers = (memberResult.data ?? []) as ClassMember[];
  const isSuperAdmin = Boolean(adminResult.data);
  const isStaff =
    isSuperAdmin ||
    ["director", "coordinator", "teacher"].includes(membership?.role ?? "");
  const canManageClass =
    isSuperAdmin ||
    membership?.role === "director" ||
    membership?.role === "coordinator" ||
    (membership?.role === "teacher" && classRoom.created_by === userId);
  const pendingInvites = (inviteResult.data ?? []) as ClassInvite[];
  const organizationStudents = (organizationMemberResult.data ?? []) as Array<{
    user_id: string;
    role: string;
  }>;

  const memberIds = Array.from(
    new Set([
      ...classMembers.map((member) => member.user_id),
      ...organizationStudents.map((member) => member.user_id),
    ]),
  );
  const { data: profileData } = memberIds.length
    ? await supabase
        .from("profiles")
        .select("id,full_name,email,username")
        .in("id", memberIds)
        .order("full_name")
    : { data: [] };
  const profiles = (profileData ?? []) as Profile[];
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/comercial" className="flex items-center gap-3">
            <Image
              src="/branding/icone-app.png"
              alt=""
              width={42}
              height={42}
              className="rounded-xl"
            />
            <div>
              <p className="font-black text-[#0B2D6B]">NabuLab</p>
              <p className="text-xs text-slate-500">
                {organization?.name ?? "Turma"}
              </p>
            </div>
          </Link>
          <Link
            href={`/comercial?org=${classRoom.organization_id}`}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Voltar à gestão
          </Link>
        </div>
      </header>

      <main id="conteudo-principal" className="mx-auto max-w-5xl px-4 py-8">
        {mensagem && (
          <p
            role="status"
            className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950"
          >
            {mensagem}
          </p>
        )}
        <p className="text-sm font-bold text-blue-700">{organization?.name}</p>
        <h1 className="mt-1 text-3xl font-black text-slate-950">
          {classRoom.name}
        </h1>
        <p className="mt-2 text-slate-600">
          {classRoom.academic_year ?? "Ano não informado"} ·{" "}
          {classRoom.description ?? "Sem descrição"}
        </p>
        {classRoom.is_archived && (
          <p className="mt-4 rounded-xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-900">
            Esta turma está arquivada. Os dados continuam preservados.
          </p>
        )}

        {canManageClass && (
          <div className="mt-5 flex justify-end">
            <ArchiveClassForm
              classId={classId}
              archived={classRoom.is_archived}
            />
          </div>
        )}

        {isStaff ? (
          <div className="mt-7 space-y-6">
            {canManageClass && !classRoom.is_archived && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black">Adicionar alunos</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Adicione quem já pertence à instituição ou convide pelo
                  identificador exato.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <form
                    action={addStudentToClass}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <input type="hidden" name="class_id" value={classId} />
                    <label className="text-sm font-semibold">
                      Aluno da instituição
                      <select className={fieldClass} name="student_id" required>
                        <option value="">Selecione</option>
                        {organizationStudents
                          .filter(
                            (student) =>
                              !classMembers.some(
                                (member) => member.user_id === student.user_id,
                              ),
                          )
                          .map((student) => (
                            <option
                              key={student.user_id}
                              value={student.user_id}
                            >
                              {profileById.get(student.user_id)?.full_name ??
                                student.user_id}
                            </option>
                          ))}
                      </select>
                    </label>
                    <button className={`${primaryButton} mt-3`}>
                      Adicionar à turma
                    </button>
                  </form>
                  <form
                    action={inviteStudentToClass}
                    className="rounded-xl bg-blue-50 p-4"
                  >
                    <input type="hidden" name="class_id" value={classId} />
                    <label className="text-sm font-semibold">
                      Aluno externo
                      <input
                        className={fieldClass}
                        name="identifier"
                        required
                        placeholder="e-mail ou @username exato"
                      />
                    </label>
                    <button className={`${primaryButton} mt-3`}>
                      Convidar aluno
                    </button>
                  </form>
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">Alunos matriculados</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Somente a equipe autorizada visualiza esta lista.
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
                  {classMembers.length}
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {classMembers.map((member) => {
                  const profile = profileById.get(member.user_id);
                  return (
                    <article
                      key={member.user_id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <p className="font-bold">
                        {profile?.full_name ?? "Aluno"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {profile?.email ?? "Dados protegidos"}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        Matrícula em{" "}
                        {new Date(member.joined_at).toLocaleDateString("pt-BR")}
                      </p>
                      {canManageClass && (
                        <div className="mt-3">
                          <RemoveStudentForm
                            classId={classId}
                            studentId={member.user_id}
                            studentName={profile?.full_name ?? "este aluno"}
                          />
                        </div>
                      )}
                    </article>
                  );
                })}
                {classMembers.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhum aluno matriculado nesta turma.
                  </p>
                )}
              </div>
            </section>
            {canManageClass && pendingInvites.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black">Convites pendentes</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Reenvie pelo formulário acima ou revogue um convite que não
                  deve mais ser usado.
                </p>
                <div className="mt-4 space-y-2">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-50 p-3"
                    >
                      <div>
                        <p className="text-sm font-bold">{invite.email}</p>
                        <p className="text-xs text-slate-500">
                          Expira em{" "}
                          {new Date(invite.expires_at).toLocaleDateString(
                            "pt-BR",
                          )}
                        </p>
                      </div>
                      <RevokeClassInviteForm
                        classId={classId}
                        inviteId={invite.id}
                        email={invite.email ?? "este aluno"}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <section className="mt-7 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-blue-700">SUA TURMA</p>
            <h2 className="mt-2 text-xl font-black">Você está matriculado</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Aqui ficarão os simulados, prazos, tentativas e resultados
              atribuídos pelo professor nas próximas fases.
            </p>
            <span className="mt-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
              {roleLabel(membership?.role)}
            </span>
          </section>
        )}
      </main>
    </div>
  );
}
