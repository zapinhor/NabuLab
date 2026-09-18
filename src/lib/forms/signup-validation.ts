export type SignupField = "full_name" | "username" | "email" | "password";

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

export function validateUsername(value: string) {
  const username = value.trim();
  if (!username) return "Escolha um username.";
  if (username.length < 3) return "O username precisa ter pelo menos 3 caracteres.";
  if (username.length > 32) return "O username pode ter no máximo 32 caracteres.";
  if (!/^[A-Za-z0-9]/.test(username)) return "O username precisa começar com uma letra ou número.";
  if (!/^[A-Za-z0-9._-]+$/.test(username)) {
    return "Use apenas letras, números, ponto, hífen ou underline no username.";
  }
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
    full_name: validateFullName,
    username: validateUsername,
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
