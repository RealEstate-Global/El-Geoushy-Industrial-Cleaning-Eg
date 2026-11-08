import type { Product, SortKey } from "@/features/catalog/data/catalog";
import { categories, products } from "@/features/catalog/data/catalog";

/** Resolve a category by id or slug. */
export const getCategory = (id: string) => categories.find((c) => c.id === id || c.slug === id);

/** Active product by slug, or undefined. */
export const getProduct = (slug: string) => products.find((p) => p.slug === slug && p.active);

/** Up to `n` related products from the same category. */
export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id && x.active).slice(0, n);

/** Client-side catalog search, filter, and sort. */
export function filterProducts(opts: {
  q?: string | undefined;
  category?: string | undefined;
  sort?: SortKey | undefined;
}) {
  const q = (opts.q ?? "").trim().toLowerCase();
  let list = products.filter((p) => p.active);
  if (opts.category) list = list.filter((p) => p.categoryId === opts.category);
  if (q)
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q),
    );
  const sort = opts.sort ?? "featured";
  list = [...list].sort((a, b) =>
    sort === "featured"
      ? Number(b.featured) - Number(a.featured)
      : sort === "name-asc"
        ? a.name.localeCompare(b.name, "ar")
        : b.name.localeCompare(a.name, "ar"),
  );
  return list;
}

/** Sort options offered by the catalog UI. */
export const SORTS: { v: SortKey; l: string }[] = [
  { v: "featured", l: "المميزة أولًا" },
  { v: "name-asc", l: "الاسم: أ - ي" },
  { v: "name-desc", l: "الاسم: ي - أ" },
];

/** Type guard for URL search params. */
export function isSortKey(value: unknown): value is SortKey {
  return SORTS.some((x) => x.v === value);
}
