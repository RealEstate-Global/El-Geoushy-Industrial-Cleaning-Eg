import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { fadeUp, stagger } from "@/shared/lib/motion";
import { DemoBadge } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";
import type { Category, Product } from "@/features/catalog/data/catalog";
import { getCategory } from "@/features/catalog/lib/catalog-queries";

export function ProductCard({ product }: { product: Product }) {
  const d = useDict();
  const cat = getCategory(product.categoryId);
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-mint"
      >
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isDemo && (
          <span className="absolute top-3 right-3">
            <DemoBadge />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold text-fresh">{cat?.name}</p>
        <h3 className="mt-1.5 text-lg font-bold">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
          {product.shortDescription}
        </p>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
        >
          {d.common.viewDetails}{" "}
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  const d = useDict();
  return (
    <motion.div variants={fadeUp}>
      <Link
        to="/products"
        search={{ category: category.id }}
        className="group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-soft"
      >
        <img
          src={category.image}
          alt={category.name}
          width={1200}
          height={912}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-navy-foreground">
          <h3 className="text-xl font-extrabold">{category.name}</h3>
          <p className="mt-1.5 text-sm leading-6 text-navy-foreground/80">{category.description}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold">
            {d.common.browseCategory}{" "}
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
