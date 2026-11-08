import { motion } from "motion/react";
import { stagger } from "@/shared/lib/motion";
import { CtaBanner, PageHero } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";
import { CategoryCard } from "@/features/catalog/components/catalog-sections";
import { categories } from "@/features/catalog/data/catalog";

export function CategoriesPage() {
  const d = useDict();
  return (
    <>
      <PageHero
        title={d.catalog.categoriesPage.title}
        subtitle={d.catalog.categoriesPage.subtitle}
        crumbs={[{ label: d.catalog.categoriesPage.crumb }]}
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container-page mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </motion.div>
      <CtaBanner />
    </>
  );
}
