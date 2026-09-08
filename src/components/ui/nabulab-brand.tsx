import Image from "next/image";
import Link from "next/link";

interface NabuLabBrandProps {
  subtitle?: string;
}

export default function NabuLabBrand({
  subtitle = "Plataforma educacional",
}: NabuLabBrandProps) {
  return (
    <Link
      href="/"
      aria-label="NabuLab — voltar ao painel"
      className="flex min-w-0 items-center gap-3"
    >
      <Image
        src="/branding/icone-app.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-xl object-contain"
      />

      <div className="min-w-0">
        <p className="truncate font-bold text-slate-900">
          NabuLab
        </p>

        <p className="truncate text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}