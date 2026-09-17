export const SUPPORT_CATEGORIES = {
  account: "Conta e acesso",
  study: "Simulados e estudos",
  technical: "Erro técnico",
  billing: "Assinatura e pagamento",
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
