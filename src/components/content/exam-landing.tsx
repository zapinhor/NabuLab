import Link from "next/link";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs, ContentShell, JsonLd } from "@/components/content/content-shell";
import { SeoPageTracking } from "@/components/content/seo-tracking";
import { Icon } from "@/components/ui/icon";
import { EXAM_LANDINGS, getExamLanding, type ExamLandingId } from "@/lib/content/exam-landings";
import { SITE_URL } from "@/lib/seo";

const number = new Intl.NumberFormat("pt-BR");

export function ExamLanding({ id }: { id: ExamLandingId }) {
  const page = getExamLanding(id);
  const tryHref = `/experimente/iniciar?area=${page.guestTrack}`;
  const signupHref = `/cadastro?next=${encodeURIComponent("/simulado/novo")}`;
  const others = EXAM_LANDINGS.filter((item) => item.id !== id);

  return (
    <ContentShell>
      <SeoPageTracking level="exam" subject={id} />
      <JsonLd value={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.eyebrow, item: `${SITE_URL}${page.path}` },
      ] }} />
      <JsonLd value={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }} />

      <section className="border-b border-blue-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: page.eyebrow }]} />
          <p className="mt-7 text-sm font-black uppercase tracking-[.16em] text-blue-700">{page.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.03em] text-[#0B2D6B] sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{page.intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedLink event="seo_cta_clicked" properties={{ placement: `exam_${id}_hero` }} href={tryHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B2D6B] px-6 py-3 text-center font-black text-white shadow-lg shadow-blue-950/15 hover:bg-blue-900">
              Responder 3 questões grátis <Icon name="avancar" size={18} />
            </TrackedLink>
            <TrackedLink event="seo_cta_clicked" properties={{ placement: `exam_${id}_signup` }} href={signupHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-center font-bold text-[#0B2D6B] hover:bg-blue-50">
              Criar conta grátis
            </TrackedLink>
          </div>
          <p className="mt-3 text-sm text-slate-500">Sem cadastro e sem cartão. {number.format(page.questionCount)} questões comentadas nesta área.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <section aria-labelledby="como-e" className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="como-e" className="text-2xl font-black text-[#0B2D6B]">{page.examTitle}</h2>
            <ul className="mt-5 space-y-3">
              {page.examFacts.map((fact) => (
                <li key={fact} className="flex gap-3 leading-7 text-slate-700"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" aria-hidden="true" />{fact}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-[#0B2D6B]">Como treinar no NabuLab</h2>
            <ol className="mt-5 space-y-3">
              {page.howTo.map((step, index) => (
                <li key={step} className="flex gap-3 leading-7 text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-black text-[#0B2D6B]">{index + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="materias" className="mt-14">
          <h2 id="materias" className="text-2xl font-black text-[#0B2D6B]">Matérias disponíveis</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.subjects.map((subject) => (
              <li key={subject.slug}>
                {subject.indexable
                  ? <Link href={`/questoes/${subject.slug}`} className="flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800 hover:border-blue-300"><span>{subject.name}</span><span className="shrink-0 whitespace-nowrap text-sm font-semibold text-slate-500">{subject.total} questões</span></Link>
                  : <span className="flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800"><span>{subject.name}</span><span className="shrink-0 whitespace-nowrap text-sm font-semibold text-slate-500">{subject.total} questões</span></span>}
              </li>
            ))}
          </ul>
        </section>

        {page.topics.length > 0 && (
          <section aria-labelledby="assuntos" className="mt-14">
            <h2 id="assuntos" className="text-2xl font-black text-[#0B2D6B]">Assuntos com mais questões</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {page.topics.map((topic) => (
                <li key={topic.href}><Link href={topic.href} className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B2D6B] hover:bg-blue-50">{topic.name} <span className="ml-1.5 text-slate-500">· {topic.subjectName}</span></Link></li>
              ))}
            </ul>
          </section>
        )}

        {page.lessons.length > 0 && (
          <section aria-labelledby="aulas" className="mt-14">
            <h2 id="aulas" className="text-2xl font-black text-[#0B2D6B]">Aulas para revisar a teoria</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.lessons.map((lesson) => (
                <li key={lesson.href}><Link href={lesson.href} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300"><strong className="leading-6 text-slate-900">{lesson.title}</strong><span className="mt-1 text-sm text-slate-500">{lesson.minutes} min de leitura</span></Link></li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="duvidas" className="mt-14">
          <h2 id="duvidas" className="text-2xl font-black text-[#0B2D6B]">Dúvidas frequentes</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {page.faq.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">{item.q}<span className="text-blue-700 transition group-open:rotate-45" aria-hidden="true">+</span></summary>
                <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-[#0B2D6B] p-7 text-white sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">Comece agora, sem cadastro</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">Responda 3 questões, veja a correção comentada e decida se quer continuar com a conta grátis.</p>
          <TrackedLink event="seo_cta_clicked" properties={{ placement: `exam_${id}_footer` }} href={tryHref} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F4C430] px-6 py-3 font-black text-[#0B2D6B] hover:bg-yellow-300">Fazer o teste grátis</TrackedLink>
        </section>

        <nav aria-label="Outros simulados" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <span className="font-bold text-slate-700">Outros simulados:</span>
          {others.map((item) => <Link key={item.path} href={item.path} className="font-semibold text-blue-700 hover:underline">{item.label}</Link>)}
        </nav>
      </div>
    </ContentShell>
  );
}
