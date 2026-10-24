import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { contentCatalog } from "@/lib/content/catalog";

const PUBLIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/comece", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/experimente", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/premium", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/para-professores", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/turmas", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/suporte", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/termos", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacidade", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const contentRoutes = [
    { path: "/questoes", changeFrequency: "weekly" as const, priority: 0.9 },
    ...contentCatalog.filter((subject) => subject.indexable).map((subject) => ({ path: `/questoes/${subject.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...contentCatalog.flatMap((subject) => subject.topics.filter((topic) => topic.indexable).map((topic) => ({ path: `/questoes/${subject.slug}/${topic.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }))),
  ];
  return [...PUBLIC_ROUTES, ...contentRoutes].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
