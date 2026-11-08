import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { PrivacyPage } from "@/features/legal/pages/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  head: () => seo("سياسة الخصوصية", "سياسة الخصوصية لموقع الجيوشي للمنظفات الصناعية.", "/privacy"),
  component: PrivacyPage,
});
