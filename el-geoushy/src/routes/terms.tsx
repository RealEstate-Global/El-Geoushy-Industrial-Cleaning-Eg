import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { TermsPage } from "@/features/legal/pages/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo(
      "الشروط والأحكام",
      "الشروط والأحكام الخاصة باستخدام موقع الجيوشي للمنظفات الصناعية.",
      "/terms",
    ),
  component: TermsPage,
});
