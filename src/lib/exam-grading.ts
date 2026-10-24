import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { getSessionQuestions } from "@/lib/quiz-engine";
import type { ExamSession } from "@/types/exam";
import type { Question } from "@/types/question";

/*
 * =========================================================
 * PROVA ASSINADA
 * =========================================================
 *
 * O servidor entrega a prova sem gabarito e junto um "token"
 * assinado com a lista exata de questões e a ordem das
 * alternativas. Na entrega, só corrigimos o que veio nesse
 * token — assim ninguém consegue pedir a correção de questões
 * que não recebeu.
 */

const TOKEN_VERSION = 1;
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type TokenPayload = {
  v: number;
  u: string;
  exp: number;
  s: Pick<ExamSession, "id" | "createdAt" | "mode" | "config" | "questionIds" | "alternativeOrders">;
};

function secret() {
  const value = process.env.EXAM_SESSION_SECRET?.trim()
    || process.env.API_RATE_LIMIT_SECRET?.trim()
    || process.env.AUTH_RATE_LIMIT_SECRET?.trim();
  if (value) return `exam-session:${value}`;
  if (process.env.NODE_ENV !== "production") return "exam-session:nabulab-development";
  throw new Error("Exam session secret is not configured");
}

function sign(data: string) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function signExamSession(session: ExamSession, userId: string) {
  const payload: TokenPayload = {
    v: TOKEN_VERSION,
    u: userId,
    exp: Date.now() + TOKEN_TTL_MS,
    s: {
      id: session.id,
      createdAt: session.createdAt,
      mode: session.mode,
      config: session.config,
      questionIds: session.questionIds,
      alternativeOrders: session.alternativeOrders,
    },
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function verifyExamToken(token: unknown, userId: string): ExamSession | null {
  if (typeof token !== "string" || token.length > 200_000) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = Buffer.from(sign(data));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as TokenPayload;
    if (payload.v !== TOKEN_VERSION || payload.u !== userId || payload.exp < Date.now()) return null;
    return { ...payload.s, alternativeOrders: payload.s.alternativeOrders ?? {} };
  } catch {
    return null;
  }
}

/*
 * =========================================================
 * CORREÇÃO
 * =========================================================
 */

/** Questão corrigida, na ordem e com as letras que o aluno viu. */
export type GradedQuestion = Question & {
  /** true quando a correção desta questão não foi liberada (ver gradeExam). */
  locked?: boolean;
};

export type GradeResult = {
  questions: GradedQuestion[];
  correct: number;
  answered: number;
  total: number;
};

/**
 * Corrige as respostas no servidor. `revealIds` limita quais questões
 * mostram gabarito e explicação (no plano gratuito, só as que a pessoa
 * respondeu e que contaram na cota); `null` libera todas.
 */
export function gradeExam(
  session: ExamSession,
  answers: Record<string, unknown>,
  revealIds: ReadonlySet<string> | null,
): GradeResult {
  const questions = getSessionQuestions(session);
  let correct = 0;
  let answered = 0;
  const graded = questions.map((question): GradedQuestion => {
    const raw = answers[question.id];
    const selected = typeof raw === "string" && question.alternatives.some((alternative) => alternative.id === raw) ? raw : null;
    if (selected !== null) answered += 1;
    if (revealIds && !revealIds.has(question.id)) {
      return { ...question, correctAnswer: "", explanation: "", alternativeExplanations: {}, locked: true };
    }
    if (selected !== null && selected === question.correctAnswer) correct += 1;
    return question;
  });
  return { questions: graded, correct, answered, total: questions.length };
}
