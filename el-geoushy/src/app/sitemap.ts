import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://new-cetris.example";
  return ["", "/product", "/uses", "/how-to-use", "/offers", "/faq", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
