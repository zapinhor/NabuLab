export type SignupField = "username" | "birth_date" | "email" | "password";

export type SignupValues = Record<SignupField, string>;

export type SignupErrors = Partial<Record<SignupField, string>>;

const FULL_NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFullName(value: string) {
  const name = value.trim();
  if (!name) return "Informe seu nome completo.";
  if (name.length < 2) return "O nome precisa ter pelo menos 2 caracteres.";
  if (name.length > 80) return "O nome pode ter no máximo 80 caracteres.";
  if (!FULL_NAME_PATTERN.test(name)) {
    return "Use apenas letras, espaços, ponto, apóstrofo ou hífen no nome.";
  }
  return null;
}

/** Regra do @username: o que pode e o que não pode, em palavras para o aluno. */
export const USERNAME_RULES = "De 3 a 24 caracteres: letras minúsculas sem acento, números e _ (underline). Comece com uma letra. Sem espaços, pontos, hífens, acentos ou @.";
export const USERNAME_PATTERN = /^[a-z][a-z0-9_]{2,23}$/;

/** Deixa como a pessoa digitou, só tira o @ do começo e põe em minúsculas. */
export function normalizeUsername(value: string) {
  return value.trim().replace(/^@+/, "").toLowerCase();
}

export function validateUsername(value: string) {
  const username = normalizeUsername(value);
  if (!username) return "Escolha um @username.";
  if (/\s/.test(username)) return "O @username não pode ter espaços.";
  if (username.length < 3) return "O @username precisa ter pelo menos 3 caracteres.";
  if (username.length > 24) return "O @username pode ter no máximo 24 caracteres.";
  if (!/^[a-z]/.test(username)) return "O @username precisa começar com uma letra.";
  if (/[^\x00-\x7f]/.test(username)) return "Não use acentos nem ç no @username.";
  if (!USERNAME_PATTERN.test(username)) return "Use só letras, números e _ (underline). Pontos, hífens e outros símbolos não são aceitos.";
  return null;
}

/** Idade completa em anos numa data (padrão: hoje). */
export function ageOn(birthDate: string, today = new Date()) {
  const [year, month, day] = birthDate.split("-").map(Number);
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age -= 1;
  return age;
}

export const GUARDIAN_CONSENT_AGE = 12;

export function validateBirthDate(value: string, today = new Date()) {
  if (!value) return "Informe sua data de nascimento.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Use uma data completa, com dia, mês e ano.";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return "Essa data não existe. Confira dia, mês e ano.";
  if (date > today) return "A data de nascimento não pode estar no futuro.";
  if (year < 1900) return "Confira o ano de nascimento.";
  return null;
}

export function validateEmail(value: string) {
  const email = value.trim();
  if (!email) return "Informe seu e-mail.";
  if (email.length > 254) return "O e-mail informado é muito longo.";
  if (!EMAIL_PATTERN.test(email)) return "Digite um e-mail completo, como nome@exemplo.com.";
  return null;
}

export function validatePassword(value: string) {
  if (!value) return "Crie uma senha.";
  if (value.length < 8) return `A senha precisa de mais ${8 - value.length} caractere${8 - value.length === 1 ? "" : "s"}.`;
  return null;
}

export function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};
  const validators = {
    username: validateUsername,
    birth_date: (value: string) => validateBirthDate(value),
    email: validateEmail,
    password: validatePassword,
  } as const;

  for (const field of Object.keys(validators) as SignupField[]) {
    const error = validators[field](values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export type PasswordStrength = {
  score: number;
  label: "Muito fraca" | "Fraca" | "Média" | "Forte" | "Muito boa";
  color: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "Muito fraca", color: "bg-slate-200" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const levels: PasswordStrength[] = [
    { score: 1, label: "Muito fraca", color: "bg-red-500" },
    { score: 2, label: "Fraca", color: "bg-orange-500" },
    { score: 3, label: "Média", color: "bg-amber-400" },
    { score: 4, label: "Forte", color: "bg-lime-500" },
    { score: 5, label: "Muito boa", color: "bg-emerald-600" },
  ];
  return levels[Math.max(0, score - 1)];
}
