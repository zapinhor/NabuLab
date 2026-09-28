import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type StudentRoom = { public_name: string; subject: string | null; school_name: string | null; teacher_name: string };
type StudentActivity = { id: string; title: string; instructions: string | null; opens_at: string | null; due_at: string | null; max_attempts: number | null; teacher_exams: { title: string } | null };

export default async function StudentClassPage({ params, searchParams }: { params: Promise<{ classId: string }>; searchParams: Promise<{ mensagem?: string }> }) {
  const { classId } = await params;
  const { mensagem } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/login?next=${encodeURIComponent(`/turmas/${classId}`)}`);
  const [roomResult, membershipResult, activitiesResult] = await Promise.all([
    supabase.rpc("get_teacher_class_for_member", { p_class_id: classId }),
    supabase.from("teacher_class_members").select("status,source,requested_at").eq("class_id", classId).eq("user_id", auth.user.id).maybeSingle(),
    supabase.from("teacher_class_activities").select("id,title,instructions,opens_at,due_at,max_attempts,status,teacher_exams(title)").eq("class_id", classId).eq("status", "published").order("due_at"),
  ]);
  if (!roomResult.data?.[0] || !membershipResult.data) notFound();
  const room = roomResult.data[0] as unknown as StudentRoom;
  const activities = (activitiesResult.data ?? []) as unknown as StudentActivity[];
  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8"><div className="mx-auto max-w-5xl"><header className="flex items-center justify-between gap-4"><Link href="/turmas" className="font-bold text-blue-700">← Minhas turmas</Link><Link href="/dashboard" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold">Painel Student</Link></header><section className="mt-8 rounded-3xl bg-[#0B2D6B] p-7 text-white"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-200">Turma</p><h1 className="mt-2 text-3xl font-black">{room.public_name}</h1><p className="mt-2 text-blue-100">Prof. {room.teacher_name || "Professor"}{room.subject ? ` · ${room.subject}` : ""}{room.school_name ? ` · ${room.school_name}` : ""}</p></section>{mensagem && <p className="mt-5 rounded-xl bg-blue-50 p-4 font-semibold text-blue-950">{mensagem}</p>}{membershipResult.data.status === "pending" ? <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="text-xl font-black">Aguardando aprovação</h2><p className="mt-2 text-slate-600">O professor ainda precisa aprovar sua solicitação de entrada.</p></section> : <section className="mt-6"><h2 className="text-2xl font-black">Atividades</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{activities.map((activity) => <article key={activity.id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-black">{activity.title}</h3><p className="mt-1 text-sm text-slate-500">{activity.teacher_exams?.title ?? "Simulado"}</p>{activity.due_at && <p className="mt-1 text-xs text-slate-500">Prazo: {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(activity.due_at))}</p>}{activity.instructions && <p className="mt-3 text-sm text-slate-600">{activity.instructions}</p>}<p className="mt-4 text-xs font-semibold text-blue-700">Atividade da turma — não consome limites Student.</p><Link href={`/turmas/atividades/${activity.id}`} className="mt-4 inline-block rounded-xl bg-[#0B2D6B] px-4 py-2 text-sm font-bold text-white">Abrir atividade</Link></article>)}{activities.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">Nenhuma atividade publicada.</p>}</div></section>}</div></main>;
}
