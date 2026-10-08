import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PUBLIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/comece", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/premium", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/turmas", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/suporte", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/termos", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacidade", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
