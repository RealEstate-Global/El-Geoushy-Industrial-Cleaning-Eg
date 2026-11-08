import { siteConfig } from "@/shared/config/site";

export function seo(title: string, description: string, path = "/") {
  const full = `${title} | ${siteConfig.shortNameAr}`;
  const meta = [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "ar_EG" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: full },
    { name: "twitter:description", content: description },
  ];
  const links = siteConfig.url ? [{ rel: "canonical", href: `${siteConfig.url}${path}` }] : [];
  if (siteConfig.url) {
    const img = `${siteConfig.url}/assets/brand/og-image.jpg`;
    meta.push({ property: "og:image", content: img }, { name: "twitter:image", content: img });
  }
  return { meta, links };
}
