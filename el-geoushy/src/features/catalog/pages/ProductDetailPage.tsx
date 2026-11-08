import { buttonVariants } from "@/shared/ui/button";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/features/catalog/data/catalog";
import { getCategory, getRelated } from "@/features/catalog/lib/catalog-queries";
import { Breadcrumbs, DemoBadge, SectionHeading } from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";
import { ProductGrid } from "@/features/catalog/components/catalog-sections";
import { WhatsAppButton } from "@/features/app-shell/components/WhatsAppButton";

type ProductDetailPageProps = {
  /** Product resolved by the route loader. */
  product: Product;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const d = useDict();
  const cat = getCategory(product.categoryId);
  const related = getRelated(product);
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "المنتجات", to: "/products" }, { label: product.name }]} />
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.gallery} alt={product.name} />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {cat && (
              <Link
                to="/products"
                search={{ category: cat.id }}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
              >
                {cat.name}
              </Link>
            )}
            {product.isDemo && <DemoBadge />}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <p className="mt-5 leading-8 text-muted-foreground">{product.description}</p>

          {product.availableSizes?.length ? (
            <div className="mt-6">
              <h2 className="font-bold">{d.catalog.detail.sizes}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.availableSizes.map((s) => (
                  <span key={s} className="rounded-full border px-3 py-1 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {product.usageInstructions?.length ? (
            <div className="mt-6">
              <h2 className="font-bold">{d.catalog.detail.usage}</h2>
              <ol className="mt-2 list-decimal space-y-1 pr-5 text-sm text-muted-foreground">
                {product.usageInstructions.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ol>
            </div>
          ) : null}
          {product.specifications?.length ? (
            <div className="mt-6">
              <h2 className="font-bold">{d.catalog.detail.specs}</h2>
              <dl className="mt-2 divide-y rounded-2xl border">
                {product.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between p-3 text-sm">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton message={d.catalog.detail.inquiry(product.name)} />
            <Link to="/products" className={buttonVariants({ variant: "soft", size: "pill" })}>
              {d.common.backToProducts}
            </Link>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading title={d.catalog.detail.related} />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border bg-mint">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={alt}
            width={1024}
            height={1024}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => setI(idx)}
              aria-label={`صورة ${idx + 1}`}
              aria-current={i === idx}
              className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${i === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img
                src={src}
                alt=""
                width={80}
                height={80}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
