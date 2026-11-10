import type { Metadata } from "next";

import { ExamLanding } from "@/components/content/exam-landing";
import { getExamLanding } from "@/lib/content/exam-landings";
import { createPublicMetadata } from "@/lib/seo";

const page = getExamLanding("detran");

export const metadata: Metadata = createPublicMetadata({ title: page.title, description: page.description, path: page.path });

export default function Page() {
  return <ExamLanding id="detran" />;
}
