import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { SortKey } from "@/features/catalog/data/catalog";
import { categories } from "@/features/catalog/data/catalog";
import { SORTS, filterProducts } from "@/features/catalog/lib/catalog-queries";
import { EmptyState, LoadingSkeleton, PageHero } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";
import { ProductGrid } from "@/features/catalog/components/catalog-sections";

export type ProductsSearch = {
  category?: string | undefined;
  q?: string | undefined;
  sort?: SortKey | undefined;
};

type ProductsPageProps = {
  /** Current URL search state, owned by the route. */
  search: ProductsSearch;
  /** Merge a partial change into the URL search state. `replace` controls history. */
  onSearch: (patch: ProductsSearch, replace?: boolean) => void;
  /** Clear all filters. */
  onReset: () => void;
};

export function ProductsPage({ search, onSearch, onReset }: ProductsPageProps) {
  const d = useDict();
  const { category, q = "", sort = "featured" } = search;
  const [text, setText] = useState(q);
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => onSearch({ q: text || undefined }, true), 250);
    return () => clearTimeout(t);
  }, [text, onSearch]);

  const list = useMemo(() => filterProducts({ q, category, sort }), [q, category, sort]);
  const setCat = (c?: string) => {
    onSearch({ category: c });
    setDrawer(false);
  };
  const clear = () => {
    setText("");
    onReset();
  };
  const hasFilters = Boolean(q || category || sort !== "featured");

  return (
    <>
      <PageHero
        title={d.catalog.productsPage.title}
        subtitle={d.catalog.productsPage.subtitle}
        crumbs={[{ label: d.catalog.productsPage.crumb }]}
      />
      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border bg-card p-4 shadow-soft">
            <h2 className="mb-3 px-2 text-sm font-bold text-muted-foreground">
              {d.catalog.productsPage.byCategoryHeading}
            </h2>
            <Filters category={category} onPick={setCat} />
          </div>
        </aside>
        <div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{d.catalog.productsPage.searchLabel}</span>
              <Search className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={d.catalog.productsPage.searchPlaceholder}
                className="h-12 w-full rounded-full border bg-card pr-11 pl-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <div className="flex gap-2">
              <Select value={sort} onValueChange={(v) => onSearch({ sort: v as SortKey })}>
                <SelectTrigger
                  aria-label={d.catalog.productsPage.sortAria}
                  className="h-12 min-w-44 flex-1 rounded-full bg-card px-4 text-sm font-semibold"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent dir="rtl" className="rounded-2xl">
                  {SORTS.map((s) => (
                    <SelectItem key={s.v} value={s.v} className="rounded-xl py-2.5">
                      {d.catalog.productsPage.sorts[s.v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                onClick={() => setDrawer(true)}
                className="inline-flex h-12 items-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> {d.catalog.productsPage.filtersButton}
              </button>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
            <p aria-live="polite">
              {list.length} {d.catalog.productsPage.countLabel}
            </p>
            {hasFilters && (
              <button
                onClick={clear}
                className="inline-flex items-center gap-1 font-bold text-primary"
              >
                <X className="h-4 w-4" /> {d.common.clearFilters}
              </button>
            )}
          </div>
          <div className="mt-5">
            {loading ? (
              <LoadingSkeleton count={6} />
            ) : list.length ? (
              <ProductGrid key={`${category}-${q}-${sort}`} products={list} />
            ) : (
              <EmptyState
                title={d.catalog.productsPage.noResultsTitle}
                text={d.catalog.productsPage.noResultsText}
                action={
                  <button
                    onClick={clear}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    {d.common.clearFilters}
                  </button>
                }
              />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={d.catalog.productsPage.drawerTitle}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-background p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">{d.catalog.productsPage.drawerTitle}</h2>
                <button
                  autoFocus
                  onClick={() => setDrawer(false)}
                  aria-label={d.catalog.productsPage.drawerClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Filters category={category} onPick={setCat} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Filters({
  category,
  onPick,
}: {
  category?: string | undefined;
  onPick: (c?: string | undefined) => void;
}) {
  const d = useDict();
  const btn = (active: boolean) =>
    `w-full rounded-xl px-4 py-2.5 text-start text-sm font-semibold transition ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`;
  return (
    <div className="space-y-1.5" role="group" aria-label={d.catalog.productsPage.filterGroupAria}>
      <button className={btn(!category)} aria-pressed={!category} onClick={() => onPick(undefined)}>
        {d.common.allCategories}
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={btn(category === c.id)}
          aria-pressed={category === c.id}
          onClick={() => onPick(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
