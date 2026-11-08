import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { FAQPage } from "@/features/faq/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo(
      "الأسئلة الشائعة",
      "إجابات على أكثر الأسئلة شيوعًا عن منتجات الجيوشي وطريقة التواصل.",
      "/faq",
    ),
  component: FAQPage,
});
