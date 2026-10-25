"use client";

import { useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { SignupForm } from "@/components/security/signup-form";
import { Icon, type IconName } from "@/components/ui/icon";
import type { SignupProfile } from "@/lib/forms/signup-profile";
import { STUDY_FOCUS_LABELS, type StudyFocus } from "@/lib/study-focus";

const OPTIONS: Array<{ id: SignupProfile; title: string; text: string; icon: IconName }> = [
  { id: "estudante", title: "Estudante", text: "Treino sozinho para vestibulares e concursos.", icon: "materias" },
  { id: "aluno", title: "Aluno", text: "Vou entrar na turma do meu professor.", icon: "turmas" },
  { id: "professor", title: "Professor", text: "Quero criar turmas e acompanhar meus alunos.", icon: "gestao-institucional" },
];

const FOCUS_OPTIONS: Array<{ id: StudyFocus; title: string; text: string; icon: IconName }> = [
  { id: "vestibular", title: "Vestibular", text: "ENEM, Fuvest, Unesp, Fatec e outros.", icon: "materias" },
  { id: "concursos", title: "Concursos", text: "Bancários, públicos, Correios e Petrobras.", icon: "gestao-institucional" },
  { id: "ambos", title: "Os dois", text: "Quero treinar vestibular e concursos.", icon: "misto" },
];

/**
 * Cadastro em dois passos: primeiro "quem é você" (um toque), depois e-mail e senha.
 * A escolha só orienta para onde a pessoa vai depois de entrar.
 */
export function SignupProfileStep({ next, initialProfile }: { next: string; initialProfile: SignupProfile | null }) {
  const [profile, setProfile] = useState<SignupProfile | null>(initialProfile);
  const [focus, setFocus] = useState<StudyFocus | null>(null);

  function chooseFocus(option: StudyFocus) {
    setFocus(option);
    void trackEvent("signup_cta_clicked", { placement: "signup_focus", focus: option });
  }

  function choose(option: SignupProfile) {
    setProfile(option);
    void trackEvent("signup_cta_clicked", { placement: "signup_profile", profile: option });
  }

  if (!profile) {
    return (
      <fieldset>
        <legend className="text-sm font-bold text-slate-800">Como você vai usar o NabuLab?</legend>
        <div className="mt-3 grid gap-2.5">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              className="group flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-[#3B82F6] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#0B2D6B]"><Icon name={option.icon} size={20} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-black text-slate-950">{option.title}</span>
                <span className="block text-sm leading-5 text-slate-600">{option.text}</span>
              </span>
              <Icon name="avancar" size={18} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#3B82F6]" />
            </button>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
          <Icon name="check" size={14} className="mt-0.5 text-emerald-600" />
          Qualquer opção dá acesso às questões de vestibular e de concursos. Você pode usar as outras áreas quando quiser.
        </p>
      </fieldset>
    );
  }

  if (profile === "estudante" && !focus) {
    return (
      <fieldset>
        <div className="mb-4 flex items-center justify-between gap-3">
          <legend className="text-sm font-bold text-slate-800">O que você quer estudar?</legend>
          <button type="button" onClick={() => setProfile(null)} className="rounded-lg px-2 py-1 text-xs font-bold text-[#3B82F6] hover:bg-blue-50">Voltar</button>
        </div>
        <div className="grid gap-2.5">
          {FOCUS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseFocus(option.id)}
              className="group flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-[#3B82F6] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#0B2D6B]"><Icon name={option.icon} size={20} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-black text-slate-950">{option.title}</span>
                <span className="block text-sm leading-5 text-slate-600">{option.text}</span>
              </span>
              <Icon name="avancar" size={18} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#3B82F6]" />
            </button>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
          <Icon name="check" size={14} className="mt-0.5 text-emerald-600" />
          Isso só organiza seus simulados. Você pode misturar vestibular e concursos quando quiser.
        </p>
      </fieldset>
    );
  }

  const chosen = OPTIONS.find((option) => option.id === profile)!;
  return (
    <div>
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#0B2D6B]"><Icon name={chosen.icon} size={16} /></span>
        <p className="min-w-0 flex-1 text-sm text-[#0B2D6B]">Entrando como <b>{chosen.title}</b>{profile === "estudante" && focus && <> · foco em <b>{STUDY_FOCUS_LABELS[focus]}</b></>}</p>
        <button type="button" onClick={() => { setProfile(null); setFocus(null); }} className="rounded-lg px-2 py-1 text-xs font-bold text-[#3B82F6] hover:bg-white">Trocar</button>
      </div>
      <SignupForm key={`${profile}-${focus ?? ""}`} next={next} intent={profile === "professor" ? "teacher" : "student"} profile={profile} studyFocus={profile === "estudante" ? focus : null} />
    </div>
  );
}
