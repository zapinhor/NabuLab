import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: ["/", "/login", "/cadastro", "/termos", "/privacidade", "/suporte"], disallow: ["/dashboard", "/perfil", "/historico", "/simulado", "/admin", "/api/"] }, sitemap: "https://nabu-lab.vercel.app/sitemap.xml" };
}
