const roleLabels: Record<string, string> = {
  director: "Diretor",
  coordinator: "Coordenador",
  teacher: "Professor",
  student: "Aluno",
  super_admin: "Super Admin",
};

export function roleLabel(role: string | null | undefined) {
  if (!role) return "Sem vínculo";
  return roleLabels[role] ?? role;
}
