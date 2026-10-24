import Link from "next/link";
import { Icon } from "@/components/ui/icon";

type Workspace = "student" | "teacher";

/**
 * Alterna entre a área do estudante e a do professor. Quem já ativou o módulo
 * Professor vê as duas abas; quem ainda não ativou vê um convite discreto.
 */
export function WorkspaceSwitch({
  current,
  isTeacher,
  tone = "dark",
  onNavigate,
}: {
  current: Workspace;
  isTeacher: boolean;
  tone?: "dark" | "light";
  onNavigate?: () => void;
}) {
  const dark = tone === "dark";

  if (!isTeacher) {
    if (current === "teacher") return null;
    return (
      <Link
        href="/para-professores"
        onClick={onNavigate}
        className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
          dark
            ? "border-white/10 bg-white/5 hover:border-[#F4C430]/50 hover:bg-white/10"
            : "border-blue-100 bg-blue-50 hover:border-blue-200"
        }`}
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${dark ? "bg-white/10 text-[#F4C430]" : "bg-white text-[#3B82F6]"}`}>
          <Icon name="turmas" size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-sm font-bold ${dark ? "text-white" : "text-[#0B2D6B]"}`}>Você é professor?</span>
          <span className={`block text-xs ${dark ? "text-slate-400" : "text-slate-600"}`}>Crie sua turma grátis</span>
        </span>
        <Icon name="avancar" size={16} className={`${dark ? "text-slate-400" : "text-[#3B82F6]"} transition group-hover:translate-x-0.5`} />
      </Link>
    );
  }

  const base = "flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-[13px] font-bold transition";
  const active = dark ? "bg-white text-[#0B2D6B] shadow-sm" : "bg-[#0B2D6B] text-white shadow-sm";
  const idle = dark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-slate-600 hover:bg-white hover:text-[#0B2D6B]";

  return (
    <nav
      aria-label="Escolher área"
      className={`flex gap-1 rounded-xl p-1 ${dark ? "bg-white/10" : "border border-slate-200 bg-slate-100"}`}
    >
      <Link
        href="/dashboard"
        onClick={onNavigate}
        aria-current={current === "student" ? "page" : undefined}
        className={`${base} ${current === "student" ? active : idle}`}
      >
        <Icon name="materias" size={14} />
        Estudante
      </Link>
      <Link
        href="/professor"
        onClick={onNavigate}
        aria-current={current === "teacher" ? "page" : undefined}
        className={`${base} ${current === "teacher" ? active : idle}`}
      >
        <Icon name="turmas" size={14} />
        Professor
      </Link>
    </nav>
  );
}
