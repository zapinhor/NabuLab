import type { MetadataRoute } from "next";
const BASE_URL = "https://nabu-lab.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/login", "/cadastro", "/premium", "/termos", "/privacidade", "/suporte"].map((path) => ({ url: `${BASE_URL}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.6 }));
}
