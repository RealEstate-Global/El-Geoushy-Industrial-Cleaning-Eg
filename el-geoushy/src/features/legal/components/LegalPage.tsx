import { TriangleAlert } from "lucide-react";
import { PageHero } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";

export function LegalPage({
  title,
  crumb,
  sections,
}: {
  title: string;
  crumb: string;
  sections: { h: string; p: string }[];
}) {
  const d = useDict();
  return (
    <>
      <PageHero title={title} crumbs={[{ label: crumb }]} />
      <article className="container-page mt-10 max-w-3xl">
        <div
          role="note"
          className="flex gap-3 rounded-2xl border border-warning/50 bg-warning/10 p-4 text-sm leading-7"
        >
          <TriangleAlert className="mt-1 h-5 w-5 shrink-0" />
          <p>{d.legal.reviewNotice}</p>
        </div>
        <div className="mt-10 space-y-8">
          {sections.map((s, i) => (
            <section key={s.h}>
              <h2 className="text-xl font-extrabold">
                {i + 1}. {s.h}
              </h2>
              <p className="mt-3 leading-8 text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
