import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContentShell, JsonLd } from "@/components/content/content-shell";
import { LessonViewTracking } from "@/components/content/lesson-tracking";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getTopicSamples } from "@/lib/content/catalog";
import { getLessonEntry, lessonCatalog } from "@/lib/content/lessons";
import { createPublicMetadata, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return lessonCatalog.map((entry) => ({ subject: entry.subjectSlug, topic: entry.topicSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string; topic: string }> }): Promise<Metadata> {
  const p = await params;
  const entry = getLessonEntry(p.subject, p.topic);
  if (!entry) return {};
  return createPublicMetadata({ title: entry.lesson.title, description: entry.lesson.intro.slice(0, 155), path: entry.href });
}

const difficultyLabel = { iniciante: "Iniciante", medio: "Médio", avancado: "Avançado" } as const;

export default async function LessonPage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
  const p = await params;
  const entry = getLessonEntry(p.subject, p.topic);
  if (!entry) notFound();
  const { lesson } = entry;
  const samples = getTopicSamples(lesson.subject, lesson.topic);
  const others = lessonCatalog.filter((item) => item.href !== entry.href).slice(0, 4);
  const crumbs = [{ name: "Estudar", item: `${SITE_URL}/estudar` }, { name: lesson.topic, item: `${SITE_URL}${entry.href}` }];

  return <ContentShell>
    <LessonViewTracking subject={lesson.subject} topic={entry.topicSlug} href={entry.href} />
    <JsonLd value={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) }} />
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Estudar", href: "/estudar" }, { label: entry.subjectName }, { label: lesson.topic }]} />
      <header className="mt-7">
        <p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">{entry.category} · {entry.subjectName} · {lesson.readingMinutes} min</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{lesson.intro}</p>
      </header>

      {lesson.sections.map((section) => <section key={section.heading} className="mt-10">
        <h2 className="text-2xl font-black">{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-slate-800">{paragraph}</p>)}
        {section.bullets && <ul className="mt-4 grid gap-2">{section.bullets.map((bullet) => <li key={bullet} className="rounded-xl border border-slate-200 bg-white px-4 py-3 leading-7 text-slate-800">{bullet}</li>)}</ul>}
        {section.table && <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-700"><tr>{section.table.headers.map((header, index) => <th key={`${header}-${index}`} scope="col" className="px-4 py-3 font-black">{header}</th>)}</tr></thead>
            <tbody>{section.table.rows.map((row) => <tr key={row.join("|")} className="border-t border-slate-200">{row.map((cell, index) => <td key={`${cell}-${index}`} className={`px-4 py-3 leading-6 ${index === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>}
      </section>)}

      <section className="mt-12" aria-labelledby="exemplos-resolvidos">
        <h2 id="exemplos-resolvidos" className="text-2xl font-black">Exemplos resolvidos</h2>
        <div className="mt-5 grid gap-4">{lesson.workedExamples.map((example, index) => <article key={example.statement} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">Exemplo {index + 1}</p>
          <p className="mt-3 leading-7 text-slate-900">{example.statement}</p>
          <details className="mt-4 rounded-xl bg-blue-50 p-4">
            <summary className="cursor-pointer font-bold text-[#0B2D6B]">Ver resolução</summary>
            <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm leading-7 text-slate-700">{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p className="mt-3 text-sm font-bold text-[#0B2D6B]">Resposta: {example.answer}</p>
          </details>
        </article>)}</div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-black">Erros comuns</h2>
          <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-6 text-slate-800">{lesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-white p-5">
          <h2 className="text-lg font-black">Resumo para revisar</h2>
          <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-6 text-slate-800">{lesson.summary.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      {samples.length > 0 && <section className="mt-12" aria-labelledby="teste">
        <h2 id="teste" className="text-2xl font-black">Teste o que você aprendeu</h2>
        <p className="mt-2 text-sm text-slate-600">Questões do banco do NabuLab sobre {lesson.topic}. Responda antes de abrir a resposta.</p>
        <div className="mt-5 grid gap-4">{samples.map((question, index) => <article key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">Questão {index + 1} · {difficultyLabel[question.difficulty]}{question.type === "true-false" ? " · Verdadeiro ou falso" : ""}</p>
          <p className="mt-3 whitespace-pre-line leading-7 text-slate-900">{question.statement}</p>
          <ol className="mt-4 grid gap-2">{question.alternatives.map((alternative) => <li key={alternative.id} className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6"><span className="font-black text-[#0B2D6B]">{alternative.id.toUpperCase()}</span><span>{alternative.text}</span></li>)}</ol>
          <details className="mt-4 rounded-xl bg-blue-50 p-4">
            <summary className="cursor-pointer font-bold text-[#0B2D6B]">Ver resposta comentada</summary>
            <p className="mt-3 text-sm font-bold text-[#0B2D6B]">Resposta: {question.alternatives.find((alternative) => alternative.id === question.correctAnswer)?.text ?? question.correctAnswer}</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{question.explanation}</p>
          </details>
        </article>)}</div>
      </section>}

      <section className="mt-12 rounded-3xl border border-blue-200 bg-blue-50 p-7">
        <h2 className="text-2xl font-black">Agora pratique {entry.subjectName}</h2>
        <p className="mt-3 leading-7 text-slate-700">Monte um simulado de {entry.subjectName}, responda sem ver o gabarito e use a correção comentada para saber o que revisar.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink event="lesson_practice_started" properties={{ subject: lesson.subject, topic: entry.topicSlug }} href={entry.practiceHref} className="rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Praticar {entry.subjectName}</TrackedLink>
          <Link href={entry.questionsHref} className="rounded-xl border border-blue-300 bg-white px-5 py-3 font-bold text-[#0B2D6B]">Ver questões de {lesson.topic}</Link>
        </div>
      </section>

      {others.length > 0 && <section className="mt-12">
        <h2 className="text-2xl font-black">Outras aulas</h2>
        <div className="mt-4 flex flex-wrap gap-3">{others.map((item) => <Link key={item.href} href={item.href} className="rounded-xl border bg-white px-4 py-3 font-bold text-[#0B2D6B]">{item.subjectName}: {item.lesson.topic}</Link>)}</div>
      </section>}
    </article>
  </ContentShell>;
}
