export const SUPPORT_CATEGORIES = {
  account: "Conta e acesso",
  study: "Simulados e estudos",
  technical: "Erro técnico",
  billing: "Assinatura e pagamento",
  question: "Problema em uma questão",
  other: "Outro assunto",
} as const;

export type SupportCategory = keyof typeof SUPPORT_CATEGORIES;

export type SupportInput = {
  category: SupportCategory;
  subject: string;
  message: string;
  pageUrl: string | null;
};

export function validateSupportInput(values: {
  category: string;
  subject: string;
  message: string;
  pageUrl: string;
}): SupportInput | null {
  const category = values.category as SupportCategory;
  const subject = values.subject.trim();
  const message = values.message.trim();
  const pageUrl = values.pageUrl.trim();

  if (!(category in SUPPORT_CATEGORIES)) return null;
  if (subject.length < 5 || subject.length > 120) return null;
  if (message.length < 20 || message.length > 4000) return null;
  if (pageUrl.length > 500) return null;

  return { category, subject, message, pageUrl: pageUrl || null };
}

export const QUESTION_PROBLEMS = {
  answer: "O gabarito parece errado",
  statement: "Erro no enunciado",
  alternatives: "Erro nas alternativas",
  explanation: "Explicação confusa ou errada",
  classification: "Matéria ou assunto errado",
  other: "Outro problema",
} as const;

export type QuestionProblem = keyof typeof QUESTION_PROBLEMS;

export type QuestionReportInput = {
  questionId: string;
  problem: QuestionProblem;
  subject: string;
  topic: string;
  subtopic: string;
  details: string;
  pageUrl: string | null;
};

const clip = (value: string, max: number) => value.trim().slice(0, max);

export function validateQuestionReport(values: Record<string, string>): QuestionReportInput | string {
  const problem = values.problem as QuestionProblem;
  if (!(problem in QUESTION_PROBLEMS)) return "Escolha qual é o problema.";
  const questionId = clip(values.question_id ?? "", 120);
  if (!/^[A-Za-z0-9._-]{3,120}$/.test(questionId)) return "Não identificamos a questão. Recarregue a página e tente de novo.";
  const details = clip(values.details ?? "", 2000);
  if (details.length < 10) return "Conte em pelo menos 10 caracteres o que você encontrou.";
  const pageUrl = clip(values.page_url ?? "", 500);
  return {
    questionId,
    problem,
    subject: clip(values.subject ?? "", 120),
    topic: clip(values.topic ?? "", 120),
    subtopic: clip(values.subtopic ?? "", 120),
    details,
    pageUrl: pageUrl || null,
  };
}
