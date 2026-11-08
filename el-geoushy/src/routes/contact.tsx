import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { ContactPage } from "@/features/contact/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo("تواصل معنا", "بيانات التواصل ونموذج الاستفسار لموقع الجيوشي للمنظفات.", "/contact"),
  component: ContactPage,
});
