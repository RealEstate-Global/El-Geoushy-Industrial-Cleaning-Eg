import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { AboutPage } from "@/features/marketing/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () =>
    seo("من نحن", "تعرف على الجيوشي للمنظفات الصناعية ورسالتنا ورؤيتنا وقيمنا.", "/about"),
  component: AboutPage,
});
