import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/shared/config/site";
import { seo } from "@/shared/lib/seo";
import { HomePage } from "@/features/marketing/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => seo("منظفات صناعية ومنزلية في مصر", siteConfig.descriptionAr, "/"),
  component: HomePage,
});
