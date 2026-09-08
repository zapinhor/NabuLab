import {
  EmptyState,
} from "@/components/ui/page-state";

export default function NotFound() {
  return (
    <EmptyState
      fullScreen
      icon="🧭"
      eyebrow="404"
      title="Página não encontrada"
      description="O endereço acessado não existe ou pode ter sido alterado."
      actionLabel="Voltar ao painel"
      actionHref="/"
      secondaryLabel="Criar simulado"
      secondaryHref="/simulado/novo"
    />
  );
}
