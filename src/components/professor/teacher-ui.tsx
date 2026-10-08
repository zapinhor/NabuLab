import Link from "next/link";

export const teacherButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B2D6B] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
export const teacherSecondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-blue-950 transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2";
export const teacherField =
  "mt-1.5 min-h-11 min-w-0 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100";
export const teacherCard =
  "rounded-2xl border border-slate-200 bg-white p-5 sm:p-6";

export function TeacherNavigation({
  active = "overview",
}: {
  active?: "overview" | "classes" | "questions" | "exams" | "performance";
}) {
  const items = [
    ["overview", "Visão geral", "/professor#visao"],
    ["classes", "Turmas", "/professor#turmas"],
    ["questions", "Questões", "/professor#questoes"],
    ["exams", "Simulados", "/professor#simulados"],
    ["performance", "Desempenho", "/professor#desempenho"],
  ] as const;

  return (
    <nav
      aria-label="Navegação do Professor"
      className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5"
    >
      <div className="flex min-w-max gap-1">
        {items.map(([id, label, href]) => (
          <Link
            key={id}
            href={href}
            aria-current={active === id ? "page" : undefined}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${active === id ? "bg-[#0B2D6B] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function TeacherBreadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav
      aria-label="Caminho da página"
      className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500"
    >
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="font-semibold text-blue-700 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function WizardSteps({
  current,
  labels,
}: {
  current: number;
  labels: string[];
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-3" aria-label="Etapas">
      {labels.map((label, index) => {
        const step = index + 1;
        const active = step === current;
        const completed = step < current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold ${active ? "bg-blue-100 text-blue-950" : completed ? "bg-slate-100 text-slate-700" : "bg-white text-slate-500"}`}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs ${active ? "bg-[#0B2D6B] text-white" : completed ? "bg-slate-700 text-white" : "border border-slate-300 bg-white"}`}
            >
              {step}
            </span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

export function EmptyTeacherState({
  title,
  description,
  action,
  href,
}: {
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
        {description}
      </p>
      <Link href={href} className={`${teacherButton} mt-5`}>
        {action}
      </Link>
    </div>
  );
}
