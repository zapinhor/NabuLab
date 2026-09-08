import {
  LoadingState,
} from "@/components/ui/page-state";

export default function Loading() {
  return (
    <LoadingState
      fullScreen
      title="Carregando..."
      description="Preparando seu ambiente de estudos."
    />
  );
}
