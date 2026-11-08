/**
 * DEMO CATALOG — sample data for interface demonstration only.
 * These are NOT verified El Geuishi products. Replace with official data.
 * Optional fields (sizes, specs, usage) are only rendered when provided.
 */
export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  availableSizes?: string[];
  specifications?: { label: string; value: string }[];
  usageInstructions?: string[];
  featured: boolean;
  active: boolean;
  isDemo: boolean;
};

const PH = "/assets/products/product-placeholder.webp";

export const categories: Category[] = [
  {
    id: "industrial",
    slug: "industrial",
    name: "منظفات صناعية",
    description: "حلول تنظيف للمصانع والورش والمنشآت ذات الاستخدام الكثيف.",
    image: "/assets/categories/industrial-cleaning.webp",
  },
  {
    id: "household",
    slug: "household",
    name: "منظفات منزلية",
    description: "منتجات للاستخدام اليومي في المطبخ والحمام وأسطح البيت.",
    image: "/assets/categories/household-cleaning.webp",
  },
  {
    id: "detergents",
    slug: "detergents",
    name: "منظفات سائلة",
    description: "سوائل تنظيف وغسيل بعبوات وأحجام مختلفة.",
    image: "/assets/categories/detergents.webp",
  },
];

const mk = (
  i: number,
  slug: string,
  name: string,
  categoryId: string,
  shortDescription: string,
  featured = false,
): Product => ({
  id: `demo-${i}`,
  slug,
  name,
  categoryId,
  shortDescription,
  description: `${shortDescription} هذا وصف تجريبي لعرض شكل صفحة المنتج، وسيتم استبداله بالبيانات الرسمية للمنتج.`,
  image: PH,
  gallery: [PH, categories.find((c) => c.id === categoryId)!.image],
  featured,
  active: true,
  isDemo: true,
});

export const products: Product[] = [
  mk(
    1,
    "demo-floor-cleaner",
    "منظف أرضيات (تجريبي)",
    "household",
    "منتج تجريبي لتنظيف الأرضيات.",
    true,
  ),
  mk(
    2,
    "demo-dish-liquid",
    "سائل أطباق (تجريبي)",
    "detergents",
    "منتج تجريبي لغسيل الأطباق.",
    true,
  ),
  mk(
    3,
    "demo-degreaser",
    "مزيل دهون صناعي (تجريبي)",
    "industrial",
    "منتج تجريبي لإزالة الدهون.",
    true,
  ),
  mk(
    4,
    "demo-glass-cleaner",
    "منظف زجاج (تجريبي)",
    "household",
    "منتج تجريبي لتنظيف الأسطح الزجاجية.",
    true,
  ),
  mk(
    5,
    "demo-laundry-liquid",
    "سائل غسيل ملابس (تجريبي)",
    "detergents",
    "منتج تجريبي لغسيل الملابس.",
  ),
  mk(
    6,
    "demo-multi-surface",
    "منظف متعدد الأسطح (تجريبي)",
    "household",
    "منتج تجريبي لأسطح متعددة.",
  ),
  mk(
    7,
    "demo-industrial-floor",
    "منظف أرضيات صناعي (تجريبي)",
    "industrial",
    "منتج تجريبي لأرضيات المنشآت.",
  ),
  mk(8, "demo-hand-soap", "صابون أيدي سائل (تجريبي)", "detergents", "منتج تجريبي لغسيل الأيدي."),
];

export type SortKey = "featured" | "name-asc" | "name-desc";
