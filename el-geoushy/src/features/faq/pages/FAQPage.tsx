import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { faqs } from "@/features/faq/data/faq";
import { CtaBanner, EmptyState, PageHero } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";
import { FAQAccordion } from "@/features/faq/components/FAQAccordion";

export function FAQPage() {
  const d = useDict();
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const f = faqs.filter((x) => (x.q + x.a).includes(q.trim()));
    return [...new Set(f.map((x) => x.group))].map((g) => ({
      g,
      items: f.filter((x) => x.group === g),
    }));
  }, [q]);
  return (
    <>
      <PageHero title={d.faq.title} crumbs={[{ label: d.faq.crumb }]} />
      <div className="container-page mt-10 max-w-3xl">
        <label className="relative block">
          <span className="sr-only">{d.faq.searchLabel}</span>
          <Search className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={d.faq.searchPlaceholder}
            className="h-12 w-full rounded-full border bg-card pr-11 pl-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <div className="mt-10 space-y-10">
          {groups.length ? (
            groups.map(({ g, items }) => (
              <section key={g}>
                <h2 className="mb-4 text-lg font-extrabold text-primary">{g}</h2>
                <FAQAccordion items={items} />
              </section>
            ))
          ) : (
            <EmptyState title={d.faq.noResultsTitle} text={d.faq.noResultsText} />
          )}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
