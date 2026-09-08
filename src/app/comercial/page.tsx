import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import {
  addInstitutionStudent,
  createClass,
  createOrganization,
  inviteCollaborator,
  inviteExternalStudent,
  respondClassInvite,
  respondOrganizationInvite,
  revokeOrganizationInvite,
  updateBranding,
} from "@/app/comercial/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { RevokeMemberForm } from "@/components/commercial/revoke-member-form";
import { roleLabel } from "@/lib/commercial/labels";

type Organization = {
  id: string;
  name: string;
  slug: string;
  kind: string;
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
};
type Membership = { organization_id: string; user_id: string; role: string };
type Profile = {
  id: string;
  full_name: string;
  email: string;
  username: string | null;
};
type ClassRoom = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  academic_year: number | null;
  created_by: string;
};
type Invite = {
  id: string;
  organization_id?: string;
  class_id?: string;
  invitee_user_id?: string | null;
  email: string | null;
  role?: string;
  status: string;
  expires_at: string;
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm";
const primaryButton =
  "rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800";
const secondaryButton =
  "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export const dynamic = "force-dynamic";

export default async function CommercialPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string; mensagem?: string }>;
}) {
  const params = await searchParams;
  if (!isSupabaseConfigured()) {
    return (
      <main
        id="conteudo-principal"
        className="mx-auto min-h-screen max-w-2xl px-4 py-16"
      >
        <Section
          title="Fundação comercial preparada"
          description="A demo continua funcionando. Para ativar Auth e os fluxos multi-instituição, configure as duas chaves públicas do Supabase no arquivo .env.local."
        >
          <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            NEXT_PUBLIC_SUPABASE_URL=...{`\n`}
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
          </pre>
          <Link href="/" className={`${secondaryButton} mt-5 inline-block`}>
            Voltar à demo
          </Link>
        </Section>
      </main>
    );
  }

  const supabase = await createClient();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;
  if (!userId) redirect("/entrar");
  const userEmail = String(claimData.claims.email ?? "").toLowerCase();

  const [
    profileResult,
    adminResult,
    orgResult,
    memberResult,
    orgInviteResult,
    classInviteResult,
    visibleClassesResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id,full_name,email,username")
      .eq("id", userId)
      .single(),
    supabase.rpc("is_super_admin"),
    supabase
      .from("organizations")
      .select("id,name,slug,kind,logo_url,primary_color,accent_color")
      .order("name"),
    supabase
      .from("organization_members")
      .select("organization_id,user_id,role"),
    supabase
      .from("organization_invites")
      .select("id,organization_id,email,role,status,expires_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase
      .from("class_invites")
      .select("id,class_id,invitee_user_id,email,status,expires_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase.from("classes").select("id,name"),
  ]);

  const profile = profileResult.data as Profile | null;
  const organizations = (orgResult.data ?? []) as Organization[];
  const memberships = (memberResult.data ?? []) as Membership[];
  const now = Date.now();
  const organizationInvites = ((orgInviteResult.data ?? []) as Invite[]).filter(
    (invite) =>
      invite.email?.toLowerCase() === userEmail &&
      new Date(invite.expires_at).getTime() > now,
  );
  const classInvites = ((classInviteResult.data ?? []) as Invite[]).filter(
    (invite) =>
      (invite.invitee_user_id === userId ||
        invite.email?.toLowerCase() === userEmail) &&
      new Date(invite.expires_at).getTime() > now,
  );
  const visibleClassById = new Map(
    (
      (visibleClassesResult.data ?? []) as Array<{ id: string; name: string }>
    ).map((classRoom) => [classRoom.id, classRoom.name]),
  );
  const isSuperAdmin = Boolean(adminResult.data);
  const selectedOrganization =
    organizations.find((organization) => organization.id === params.org) ??
    organizations[0] ??
    null;
  const selectedMembership = memberships.find(
    (membership) =>
      membership.organization_id === selectedOrganization?.id &&
      membership.user_id === userId,
  );
  const canManageOrganization =
    isSuperAdmin || selectedMembership?.role === "director";
  const canCreateClass =
    isSuperAdmin ||
    ["director", "coordinator", "teacher"].includes(
      selectedMembership?.role ?? "",
    );

  let selectedMembers: Membership[] = [];
  let selectedProfiles: Profile[] = [];
  let classes: ClassRoom[] = [];
  let selectedOrgInvites: Invite[] = [];
  if (selectedOrganization) {
    const [membersResult, profilesResult, classesResult, invitesResult] =
      await Promise.all([
        supabase
          .from("organization_members")
          .select("organization_id,user_id,role")
          .eq("organization_id", selectedOrganization.id),
        supabase
          .from("profiles")
          .select("id,full_name,email,username")
          .order("full_name"),
        supabase
          .from("classes")
          .select(
            "id,organization_id,name,description,academic_year,created_by",
          )
          .eq("organization_id", selectedOrganization.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("organization_invites")
          .select("id,organization_id,email,role,status,expires_at")
          .eq("organization_id", selectedOrganization.id)
          .eq("status", "pending"),
      ]);
    selectedMembers = (membersResult.data ?? []) as Membership[];
    selectedProfiles = (profilesResult.data ?? []) as Profile[];
    classes = (classesResult.data ?? []) as ClassRoom[];
    selectedOrgInvites = (invitesResult.data ?? []) as Invite[];
  }
  const profileById = new Map(selectedProfiles.map((item) => [item.id, item]));
  const institutionStudents = selectedMembers.filter(
    (member) => member.role === "student",
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/branding/icone-app.png"
              alt=""
              width={42}
              height={42}
              className="rounded-xl"
            />
            <div>
              <p className="font-black text-[#0B2D6B]">NabuLab</p>
              <p className="text-xs text-slate-500">Gestão comercial</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">
              {profile?.full_name ?? profile?.email}
            </span>
            <form action={signOut}>
              <button className={secondaryButton}>Sair</button>
            </form>
          </div>
        </div>
      </header>
      <main id="conteudo-principal" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-7">
          <p className="text-sm font-bold text-blue-700">FASE 1 COMERCIAL</p>
          <h1 className="mt-1 text-3xl font-black text-slate-950">
            Instituições, turmas e convites
          </h1>
          <p className="mt-2 text-slate-600">
            A área de simulados continua usando os dados locais atuais durante a
            transição.
          </p>
        </div>
        {params.mensagem && (
          <p
            role="status"
            className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950"
          >
            {params.mensagem}
          </p>
        )}

        {(organizationInvites.length > 0 || classInvites.length > 0) && (
          <Section
            title="Seus convites"
            description="Aceite ou recuse vínculos enviados para sua conta ou e-mail."
          >
            <div className="space-y-3">
              {organizationInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-bold">
                      Instituição:{" "}
                      {organizations.find(
                        (org) => org.id === invite.organization_id,
                      )?.name ?? invite.organization_id}
                    </p>
                    <p className="text-sm text-slate-500">
                      Papel: {roleLabel(invite.role)} · expira em{" "}
                      {new Date(invite.expires_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <form
                    action={respondOrganizationInvite}
                    className="flex gap-2"
                  >
                    <input type="hidden" name="invite_id" value={invite.id} />
                    <button
                      name="decision"
                      value="accept"
                      className={primaryButton}
                    >
                      Aceitar
                    </button>
                    <button
                      name="decision"
                      value="decline"
                      className={secondaryButton}
                    >
                      Recusar
                    </button>
                  </form>
                </div>
              ))}
              {classInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-bold">Convite para turma</p>
                    <p className="text-sm text-slate-500">
                      {visibleClassById.get(invite.class_id ?? "") ?? "Turma"} ·
                      expira em{" "}
                      {new Date(invite.expires_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <form action={respondClassInvite} className="flex gap-2">
                    <input type="hidden" name="invite_id" value={invite.id} />
                    <button
                      name="decision"
                      value="accept"
                      className={primaryButton}
                    >
                      Aceitar
                    </button>
                    <button
                      name="decision"
                      value="decline"
                      className={secondaryButton}
                    >
                      Recusar
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <Section
              title="Ambientes"
              description={
                isSuperAdmin
                  ? "Visão global de Super Admin"
                  : "Seus vínculos ativos"
              }
            >
              <nav className="space-y-2">
                {organizations.map((organization) => (
                  <Link
                    key={organization.id}
                    href={`/comercial?org=${organization.id}`}
                    className={`block rounded-xl px-3 py-3 text-sm font-bold ${selectedOrganization?.id === organization.id ? "bg-blue-100 text-blue-950" : "bg-slate-50 text-slate-700"}`}
                  >
                    {organization.name}
                    <span className="mt-1 block text-xs font-normal opacity-70">
                      /{organization.slug}
                    </span>
                  </Link>
                ))}
                {organizations.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhum ambiente disponível.
                  </p>
                )}
              </nav>
            </Section>
            {isSuperAdmin && (
              <Section
                title="Nova instituição"
                description="Somente Super Admin pode criar o tenant."
              >
                <form action={createOrganization} className="space-y-3">
                  <label className="block text-sm font-semibold">
                    Nome
                    <input className={fieldClass} name="name" required />
                  </label>
                  <label className="block text-sm font-semibold">
                    Slug
                    <input
                      className={fieldClass}
                      name="slug"
                      pattern="[a-z0-9][a-z0-9-]{1,62}[a-z0-9]"
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    Tipo
                    <select className={fieldClass} name="kind">
                      <option value="school">Escola</option>
                      <option value="course">Curso</option>
                      <option value="other">Outro</option>
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block text-xs font-semibold">
                      Cor principal
                      <input
                        className={fieldClass}
                        type="color"
                        name="primary_color"
                        defaultValue="#0B2D6B"
                      />
                    </label>
                    <label className="block text-xs font-semibold">
                      Destaque
                      <input
                        className={fieldClass}
                        type="color"
                        name="accent_color"
                        defaultValue="#F4C430"
                      />
                    </label>
                  </div>
                  <button className={primaryButton}>Criar instituição</button>
                </form>
              </Section>
            )}
          </aside>

          <div className="space-y-6">
            {!selectedOrganization ? (
              <Section
                title="Pronto para começar"
                description="Um Super Admin precisa criar a primeira instituição, ou você precisa aceitar um convite."
              >
                <p className="text-sm text-slate-600">
                  O papel global é concedido apenas por SQL administrativo
                  revisado; ele nunca vem dos metadados editáveis do usuário.
                </p>
              </Section>
            ) : (
              <>
                <Section
                  title={selectedOrganization.name}
                  description={`/${selectedOrganization.slug} · ${roleLabel(isSuperAdmin ? "super_admin" : selectedMembership?.role)}`}
                >
                  <div className="flex flex-wrap gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{
                        backgroundColor: selectedOrganization.primary_color,
                      }}
                    >
                      Cor principal
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold text-slate-950"
                      style={{
                        backgroundColor: selectedOrganization.accent_color,
                      }}
                    >
                      Destaque
                    </span>
                  </div>
                  {canManageOrganization && (
                    <form
                      action={updateBranding}
                      className="mt-5 grid gap-3 sm:grid-cols-3"
                    >
                      <input
                        type="hidden"
                        name="organization_id"
                        value={selectedOrganization.id}
                      />
                      <label className="text-sm font-semibold">
                        Logo (URL)
                        <input
                          className={fieldClass}
                          type="url"
                          name="logo_url"
                          defaultValue={selectedOrganization.logo_url ?? ""}
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Cor principal
                        <input
                          className={fieldClass}
                          type="color"
                          name="primary_color"
                          defaultValue={selectedOrganization.primary_color}
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Destaque
                        <input
                          className={fieldClass}
                          type="color"
                          name="accent_color"
                          defaultValue={selectedOrganization.accent_color}
                        />
                      </label>
                      <button
                        className={`${primaryButton} sm:col-span-3 sm:justify-self-start`}
                      >
                        Salvar identidade
                      </button>
                    </form>
                  )}
                </Section>

                {selectedMembership?.role !== "student" && (
                  <Section
                    title="Equipe e alunos"
                    description="Membros visíveis somente para a equipe autorizada desta instituição."
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedMembers.map((member) => {
                        const memberProfile = profileById.get(member.user_id);
                        const memberName =
                          memberProfile?.full_name ??
                          memberProfile?.email ??
                          member.user_id;
                        const canRevokeMember =
                          member.user_id !== userId &&
                          (isSuperAdmin ||
                            (selectedMembership?.role === "director" &&
                              ["coordinator", "teacher"].includes(
                                member.role,
                              )));
                        return (
                          <article
                            key={member.user_id}
                            className="rounded-xl border border-slate-200 p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-bold">{memberName}</p>
                                <p className="text-xs text-slate-500">
                                  {memberProfile?.email} ·{" "}
                                  {roleLabel(member.role)}
                                </p>
                              </div>
                              {canRevokeMember && (
                                <RevokeMemberForm
                                  organizationId={selectedOrganization.id}
                                  userId={member.user_id}
                                  memberName={memberName}
                                />
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    {canManageOrganization && (
                      <form
                        action={inviteCollaborator}
                        className="mt-5 grid gap-3 sm:grid-cols-[1fr_180px_auto]"
                      >
                        <input
                          type="hidden"
                          name="organization_id"
                          value={selectedOrganization.id}
                        />
                        <label className="text-sm font-semibold">
                          E-mail exato
                          <input
                            className={fieldClass}
                            type="email"
                            name="email"
                            required
                          />
                        </label>
                        <label className="text-sm font-semibold">
                          Papel
                          <select className={fieldClass} name="role">
                            {isSuperAdmin && (
                              <option value="director">Diretor</option>
                            )}
                            <option value="coordinator">Coordenador</option>
                            <option value="teacher">Professor</option>
                          </select>
                        </label>
                        <button className={`${primaryButton} self-end`}>
                          Convidar
                        </button>
                      </form>
                    )}
                    {canManageOrganization && selectedOrgInvites.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {selectedOrgInvites.map((invite) => (
                          <div
                            key={invite.id}
                            className="flex items-center justify-between rounded-xl bg-amber-50 p-3 text-sm"
                          >
                            <span>
                              {invite.email} · {roleLabel(invite.role)}
                            </span>
                            <form action={revokeOrganizationInvite}>
                              <input
                                type="hidden"
                                name="organization_id"
                                value={selectedOrganization.id}
                              />
                              <input
                                type="hidden"
                                name="invite_id"
                                value={invite.id}
                              />
                              <button className="font-bold text-red-700">
                                Revogar
                              </button>
                            </form>
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                )}

                {canCreateClass && (
                  <Section
                    title="Nova turma"
                    description="Diretor, coordenador e professor podem criar turmas conforme as políticas do tenant."
                  >
                    <form
                      action={createClass}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      <input
                        type="hidden"
                        name="organization_id"
                        value={selectedOrganization.id}
                      />
                      <label className="text-sm font-semibold">
                        Nome
                        <input className={fieldClass} name="name" required />
                      </label>
                      <label className="text-sm font-semibold">
                        Ano letivo
                        <input
                          className={fieldClass}
                          type="number"
                          name="academic_year"
                          min="2000"
                          max="2200"
                          defaultValue={new Date().getFullYear()}
                        />
                      </label>
                      <label className="text-sm font-semibold">
                        Descrição
                        <input className={fieldClass} name="description" />
                      </label>
                      <button
                        className={`${primaryButton} sm:col-span-3 sm:justify-self-start`}
                      >
                        Criar turma
                      </button>
                    </form>
                  </Section>
                )}

                <Section
                  title="Turmas"
                  description="Alunos internos entram diretamente; externos recebem um convite separado."
                >
                  <div className="space-y-4">
                    {classes.map((classRoom) => {
                      const canManageClass =
                        isSuperAdmin ||
                        selectedMembership?.role === "director" ||
                        selectedMembership?.role === "coordinator" ||
                        (selectedMembership?.role === "teacher" &&
                          classRoom.created_by === userId);
                      return (
                        <article
                          key={classRoom.id}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <Link
                            href={`/comercial/turmas/${classRoom.id}`}
                            className="font-black text-slate-950 hover:text-blue-700 hover:underline"
                          >
                            {classRoom.name}
                          </Link>
                          <p className="text-sm text-slate-500">
                            {classRoom.academic_year ?? "Ano não informado"} ·{" "}
                            {classRoom.description ?? "Sem descrição"}
                          </p>
                          <Link
                            href={`/comercial/turmas/${classRoom.id}`}
                            className="mt-3 inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Abrir turma
                          </Link>
                          {canManageClass && (
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                              <form
                                action={addInstitutionStudent}
                                className="rounded-xl bg-slate-50 p-3"
                              >
                                <input
                                  type="hidden"
                                  name="organization_id"
                                  value={selectedOrganization.id}
                                />
                                <input
                                  type="hidden"
                                  name="class_id"
                                  value={classRoom.id}
                                />
                                <label className="text-sm font-semibold">
                                  Adicionar aluno da instituição
                                  <select
                                    className={fieldClass}
                                    name="student_id"
                                    required
                                  >
                                    <option value="">Selecione</option>
                                    {institutionStudents.map((student) => (
                                      <option
                                        key={student.user_id}
                                        value={student.user_id}
                                      >
                                        {profileById.get(student.user_id)
                                          ?.full_name ?? student.user_id}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                                <button className={`${secondaryButton} mt-3`}>
                                  Adicionar
                                </button>
                              </form>
                              <form
                                action={inviteExternalStudent}
                                className="rounded-xl bg-blue-50 p-3"
                              >
                                <input
                                  type="hidden"
                                  name="organization_id"
                                  value={selectedOrganization.id}
                                />
                                <input
                                  type="hidden"
                                  name="class_id"
                                  value={classRoom.id}
                                />
                                <label className="text-sm font-semibold">
                                  Convidar aluno externo
                                  <input
                                    className={fieldClass}
                                    name="identifier"
                                    required
                                    placeholder="e-mail exato ou @username exato"
                                  />
                                </label>
                                <button className={`${primaryButton} mt-3`}>
                                  Enviar convite
                                </button>
                              </form>
                            </div>
                          )}
                        </article>
                      );
                    })}
                    {classes.length === 0 && (
                      <p className="text-sm text-slate-500">
                        Nenhuma turma criada.
                      </p>
                    )}
                  </div>
                </Section>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
