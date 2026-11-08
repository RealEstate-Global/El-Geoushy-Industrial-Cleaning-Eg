import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/features/catalog/data/catalog";
import { siteConfig } from "@/shared/config/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = siteConfig.url ?? new URL(request.url).origin;
        const paths = [
          "/",
          "/products",
          "/categories",
          "/about",
          "/contact",
          "/faq",
          "/privacy",
          "/terms",
          ...products.filter((p) => p.active).map((p) => `/products/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${base}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
