import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProduct } from "@/features/catalog/lib/catalog-queries";
import { seo } from "@/shared/lib/seo";
import { ProductDetailPage } from "@/features/catalog/pages/ProductDetailPage";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(
          loaderData.product.name,
          loaderData.product.shortDescription,
          `/products/${loaderData.product.slug}`,
        )
      : { meta: [{ title: "منتج غير موجود" }, { name: "robots", content: "noindex" }] },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { product } = Route.useLoaderData();
  return <ProductDetailPage product={product} />;
}
