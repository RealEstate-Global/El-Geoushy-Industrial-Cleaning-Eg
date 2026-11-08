import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "@/shared/lib/seo";
import { ProductsPage } from "@/features/catalog/pages/ProductsPage";
import type { ProductsSearch } from "@/features/catalog/pages/ProductsPage";
import { isSortKey } from "@/features/catalog/lib/catalog-queries";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): ProductsSearch => ({
    category: typeof s["category"] === "string" ? s["category"] : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    sort: isSortKey(s["sort"]) ? s["sort"] : undefined,
  }),
  head: () =>
    seo(
      "كل المنتجات",
      "تصفح كتالوج منتجات الجيوشي للمنظفات الصناعية والمنزلية وابحث حسب القسم.",
      "/products",
    ),
  component: ProductsRoute,
});

function ProductsRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  return (
    <ProductsPage
      search={search}
      onSearch={(patch, replace) =>
        navigate({
          search: (prev) => Object.assign({}, prev, patch),
          replace: replace ?? false,
        })
      }
      onReset={() => navigate({ search: {} })}
    />
  );
}
