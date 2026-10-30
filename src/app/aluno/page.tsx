import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { joinClassByCode, respondClassInvite } from "@/app/turmas/actions";
import { NotificationBell } from "@/components/notifications/notification-bell";
import StudentAvatar from "@/components/student/student-avatar";
import { Icon } from "@/components/ui/icon";
import { createPrivateMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = createPrivateMetadata("Área do aluno", "Suas turmas, atividades do professor e notas no NabuLab.");

type ClassRow = { class_id: string; status: string; teacher_classes: { id: string; public_name: string; subject: string | null; school_name: string | null } | null };
type ActivityRow = { id: string; class_id: string; title: string; status: string; due_at: string | null; opens_at: string | null; teacher_classes: { public_name: string } | null };
type AttemptRow = { activity_id: string; status: string; score: number | null; submitted_at: string | null };
type InviteRow = { id: string; teacher_classes: { public_name: string } | null };
type Room = { teacher_name: string; teacher_avatar_url: string | null };

const dateTime = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
const button = "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B2D6B] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900";

export default async function StudentAreaPage({ searchParams }: { searchParams: Promise<{ mensagem?: string }> }) {
  const { mensagem } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?next=%2Faluno");
  const userId = auth.user.id;

  const [profileResult, membershipsResult, invitesResult] = await Promise.all([
    supabase.from("profiles").select("full_name,username,avatar_url").eq("id", userId).maybeSingle(),
    supabase.from("teacher_class_members").select("class_id,status,teacher_classes(id,public_name,subject,school_name)").eq("user_id", userId).in("status", ["active", "pending"]),
    supabase.from("teacher_class_invites").select("id,teacher_classes(public_name)").eq("status", "pending"),
  ]);
  const memberships = (membershipsResult.data ?? []) as unknown as ClassRow[];
  const invites = (invitesResult.data ?? []) as unknown as InviteRow[];
  const activeIds = memberships.filter((item) => item.status === "active").map((item) => item.class_id);

  const [activitiesResult, attemptsResult, rooms] = await Promise.all([
    activeIds.length
      ? supabase.from("teacher_class_activities").select("id,class_id,title,status,due_at,opens_at,teacher_classes(public_name)").in("class_id", activeIds).in("status", ["published", "closed"]).order("due_at", { ascending: true, nullsFirst: false }).limit(60)
      : Promise.resolve({ data: [] }),
    supabase.from("teacher_activity_attempts").select("activity_id,status,score,submitted_at").eq("student_id", userId),
    Promise.all(memberships.map(async (item) => {
      const { data } = await supabase.rpc("get_teacher_class_for_member", { p_class_id: item.class_id });
      return [item.class_id, ((data ?? [])[0] ?? null) as Room | null] as const;
    })),
  ]);
  const activities = (activitiesResult.data ?? []) as unknown as ActivityRow[];
  const attempts = (attemptsResult.data ?? []) as unknown as AttemptRow[];
  const roomByClass = new Map(rooms);

  const now = new Date().getTime();
  const bestAttempt = (activityId: string) => {
    const mine = attempts.filter((attempt) => attempt.activity_id === activityId);
    return mine.find((attempt) => attempt.status === "submitted") ?? mine.find((attempt) => attempt.status === "in_progress") ?? null;
  };
  const pending = activities.filter((activity) => activity.status === "published" && bestAttempt(activity.id)?.status !== "submitted" && (!activity.due_at || new Date(activity.due_at).getTime() >= now));
  const missed = activities.filter((activity) => activity.status === "published" && bestAttempt(activity.id)?.status !== "submitted" && activity.due_at && new Date(activity.due_at).getTime() < now);
  const delivered = activities
    .map((activity) => ({ activity, attempt: bestAttempt(activity.id) }))
    .filter((item): item is { activity: ActivityRow; attempt: AttemptRow } => item.attempt?.status === "submitted")
    .sort((a, b) => (b.attempt.submitted_at ?? "").localeCompare(a.attempt.submitted_at ?? ""));
  const recentDelivered = delivered.slice(0, 8);

  const profile = profileResult.data;
  const name = profile?.full_name?.trim() || profile?.username || "Aluno";

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700"><Icon name="voltar" size={16} /> Painel</Link>
          <div className="flex items-center gap-2"><NotificationBell /><Link href="/perfil" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold">Perfil</Link></div>
        </header>

        <section className="mt-6 flex flex-wrap items-center gap-4 rounded-3xl bg-[#0B2D6B] p-6 text-white sm:p-8">
          <StudentAvatar name={name} avatarUrl={profile?.avatar_url ?? null} size="lg" />
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[.16em] text-blue-200">Área do aluno</p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">{name}</h1>
            {profile?.username && <p className="text-sm text-blue-100">@{profile.username}</p>}
          </div>
          <dl className="ml-auto grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 px-3 py-2"><dt className="text-xs text-blue-100">Turmas</dt><dd className="text-xl font-black">{activeIds.length}</dd></div>
            <div className="rounded-2xl bg-white/10 px-3 py-2"><dt className="text-xs text-blue-100">A fazer</dt><dd className="text-xl font-black">{pending.length}</dd></div>
            <div className="rounded-2xl bg-white/10 px-3 py-2"><dt className="text-xs text-blue-100">Entregues</dt><dd className="text-xl font-black">{delivered.length}</dd></div>
          </dl>
        </section>

        {mensagem && <p role="status" className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-950">{mensagem}</p>}

        {invites.length > 0 && (
          <section aria-labelledby="convites" className="mt-6">
            <h2 id="convites" className="text-xl font-black">Convites de professores</h2>
            <div className="mt-3 space-y-3">
              {invites.map((invite) => (
                <article key={invite.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-black">{invite.teacher_classes?.public_name ?? "Turma"}</p>
                  <form action={respondClassInvite} className="flex gap-2">
                    <input type="hidden" name="invite_id" value={invite.id} />
                    <input type="hidden" name="return_to" value="/aluno" />
                    <button name="decision" value="accept" className={button}>Aceitar</button>
                    <button name="decision" value="reject" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold">Recusar</button>
                  </form>
                </article>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="a-fazer" className="mt-8">
          <h2 id="a-fazer" className="text-xl font-black">Atividades para fazer</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {pending.map((activity) => {
              const started = bestAttempt(activity.id)?.status === "in_progress";
              return (
                <Link key={activity.id} href={`/turmas/atividades/${activity.id}`} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300">
                  <span className="text-xs font-bold text-slate-500">{activity.teacher_classes?.public_name ?? "Turma"}</span>
                  <strong className="mt-1">{activity.title}</strong>
                  <span className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className={`rounded-full px-2 py-0.5 ${started ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900"}`}>{started ? "Em andamento" : "Não iniciada"}</span>
                    <span className="text-slate-600">{activity.due_at ? `Prazo ${dateTime.format(new Date(activity.due_at))}` : "Sem prazo"}</span>
                  </span>
                </Link>
              );
            })}
            {pending.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">{activeIds.length ? "Tudo em dia. Nenhuma atividade pendente." : "Quando você entrar em uma turma, as atividades do professor aparecem aqui."}</p>}
          </div>
          {missed.length > 0 && (
            <p className="mt-3 text-sm text-slate-600">{missed.length === 1 ? "1 atividade passou do prazo sem entrega." : `${missed.length} atividades passaram do prazo sem entrega.`} Fale com seu professor se precisar.</p>
          )}
        </section>

        <section aria-labelledby="entregues" className="mt-8">
          <h2 id="entregues" className="text-xl font-black">Entregues</h2>
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {recentDelivered.map(({ activity, attempt }) => (
              <Link key={activity.id} href={`/turmas/atividades/${activity.id}`} className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50">
                <span className="min-w-0"><strong className="block">{activity.title}</strong><span className="text-xs text-slate-500">{activity.teacher_classes?.public_name ?? "Turma"}{attempt.submitted_at ? ` · ${dateTime.format(new Date(attempt.submitted_at))}` : ""}</span></span>
                <span className="text-sm font-black text-[#0B2D6B]">{attempt.score === null ? "Entregue" : `${Math.round(Number(attempt.score))}%`}</span>
              </Link>
            ))}
            {delivered.length === 0 && <p className="p-5 text-sm text-slate-600">Nenhuma atividade entregue ainda.</p>}
          </div>
        </section>

        <section aria-labelledby="minhas-turmas" className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="minhas-turmas" className="text-xl font-black">Minhas turmas</h2>
            <Link href="/turmas" className="text-sm font-bold text-blue-700">Encontrar turmas públicas</Link>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {memberships.map((item) => {
              const room = roomByClass.get(item.class_id);
              return (
                <Link key={item.class_id} href={`/turmas/${item.class_id}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300">
                  <StudentAvatar name={room?.teacher_name || "Professor"} avatarUrl={room?.teacher_avatar_url ?? null} />
                  <span className="min-w-0">
                    <strong className="block">{item.teacher_classes?.public_name ?? "Turma"}</strong>
                    <span className="block text-xs text-slate-500">{room?.teacher_name ? `Prof. ${room.teacher_name}` : "Professor"}{item.teacher_classes?.subject ? ` · ${item.teacher_classes.subject}` : ""}</span>
                    {item.status === "pending" && <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">Aguardando aprovação</span>}
                  </span>
                </Link>
              );
            })}
          </div>
          <form action={joinClassByCode} className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <input type="hidden" name="return_to" value="/aluno" />
            <label htmlFor="codigo-turma" className="w-full text-sm font-bold">Recebeu um código do professor?</label>
            <input id="codigo-turma" name="code" required placeholder="Ex.: LIVIA-9A-X7K2" className="min-h-11 flex-1 rounded-xl border border-slate-300 px-4 uppercase" />
            <button className={button}>Entrar na turma</button>
          </form>
        </section>

        <p className="mt-8 text-xs text-slate-500">Atividades de turma não usam sua cota diária de questões grátis.</p>
      </div>
    </main>
  );
}
