import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/premium", "/termos", "/privacidade", "/suporte"],
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/analise",
        "/auditoria",
        "/cadastro",
        "/comercial/",
        "/dashboard",
        "/dominio",
        "/entrar",
        "/evolucao",
        "/historico",
        "/login",
        "/metas",
        "/perfil",
        "/recomendado",
        "/recuperar-senha",
        "/redefinir-senha",
        "/revisao",
        "/simulado/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
