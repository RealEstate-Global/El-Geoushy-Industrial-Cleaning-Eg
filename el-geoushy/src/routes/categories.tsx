import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { CategoriesPage } from "@/features/catalog/pages/CategoriesPage";

export const Route = createFileRoute("/categories")({
  head: () =>
    seo(
      "أقسام المنتجات",
      "تعرف على أقسام منتجات الجيوشي: منظفات صناعية، منزلية، وسائلة.",
      "/categories",
    ),
  component: CategoriesPage,
});
