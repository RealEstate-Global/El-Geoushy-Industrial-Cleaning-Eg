import type { Locale } from "@/shared/i18n/locale";

/**
 * Central business configuration. Replace null values with VERIFIED data only.
 * Any field left null is hidden from the site (no fake links are generated).
 */
export const siteConfig = {
  nameAr: "الجيوشي للمنظفات الصناعية",
  nameEn: "El Geuishi Industrial Detergents",
  shortNameAr: "الجيوشي",
  shortNameEn: "El Geuishi",
  tagline: "النظافة تبدأ من الاختيار الصح",
  descriptionAr:
    "اكتشف مجموعة منتجات الجيوشي للمنظفات الصناعية وحلول النظافة للاستخدامات المختلفة.",
  descriptionEn:
    "Explore El Geuishi's industrial detergent range and cleaning solutions for different uses.",
  /** Public site URL for canonical/sitemap links, e.g. "https://elgeuishi.com" */
  url: null as string | null,
  contact: {
    /** International format without + or spaces, e.g. "201001234567" */
    whatsapp: "201016264326" as string | null,
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    workingHours: null as string | null,
  },
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  },
};

/** Locale-aware business fields. `null` fields stay hidden from the UI. */
export const siteName = (locale: Locale) =>
  locale === "ar" ? siteConfig.nameAr : siteConfig.nameEn;
export const siteShortName = (locale: Locale) =>
  locale === "ar" ? siteConfig.shortNameAr : siteConfig.shortNameEn;
export const siteDescription = (locale: Locale) =>
  locale === "ar" ? siteConfig.descriptionAr : siteConfig.descriptionEn;

export const isWhatsAppConfigured = () => Boolean(siteConfig.contact.whatsapp);

export function whatsappLink(message: string): string | null {
  const n = siteConfig.contact.whatsapp;
  if (!n) return null;
  return `https://wa.me/${n.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Navigation: labels live in the i18n dictionaries (`d.common.nav[key]`). */
export const navRoutes = [
  { to: "/", key: "home" },
  { to: "/products", key: "products" },
  { to: "/categories", key: "categories" },
  { to: "/about", key: "about" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
] as const;

export type NavKey = (typeof navRoutes)[number]["key"];
