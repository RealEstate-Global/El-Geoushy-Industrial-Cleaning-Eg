import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { buttonVariants } from "@/shared/ui/button";
import { BadgeCheck, Factory, Headset, Home, Layers, Sparkles } from "lucide-react";
import { faqs } from "@/features/faq/data/faq";
import { siteConfig, siteName } from "@/shared/config/site";
import { fadeUp, imageReveal, inView, stagger } from "@/shared/lib/motion";
import { CtaBanner, FeatureCard, SectionHeading } from "@/shared/components/page-sections";
import { useDict, useLocale } from "@/shared/i18n/LocaleProvider";
import { CategoryCard, ProductCard } from "@/features/catalog/components/catalog-sections";
import { categories, products } from "@/features/catalog/data/catalog";
import { FAQAccordion } from "@/features/faq/components/FAQAccordion";

export function HomePage() {
  const d = useDict();
  const { locale } = useLocale();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.img
          variants={imageReveal}
          initial="hidden"
          animate="show"
          src="/assets/hero/hero-cleaning-products.webp"
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-background via-background/85 to-background/10"
          aria-hidden
        />
        <div className="container-page relative flex min-h-[560px] items-center py-16 lg:min-h-[680px] lg:py-24">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-bold text-fresh shadow-soft"
            >
              <Sparkles className="h-3.5 w-3.5" /> {siteName(locale)}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-black leading-[1.25] sm:text-5xl lg:text-6xl"
            >
              {d.home.heroTitleLine1}{" "}
              <span className="text-gradient-brand">{d.home.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-9 text-muted-foreground"
            >
              {locale === "ar" ? siteConfig.descriptionAr : siteConfig.descriptionEn}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Link to="/products" className={buttonVariants({ variant: "brand", size: "pillLg" })}>
                {d.common.browseProducts}
              </Link>
              <Link to="/contact" className={buttonVariants({ variant: "soft", size: "pillLg" })}>
                {d.common.contactUs}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={d.home.categories.eyebrow} title={d.home.categories.title} />
          <Link to="/categories" className="text-sm font-bold text-primary">
            {d.home.categories.allLink} →
          </Link>
        </div>
        <motion.div variants={stagger} {...inView} className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </motion.div>
      </section>

      {/* Featured */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={d.home.featured.eyebrow}
            title={d.home.featured.title}
            subtitle={d.home.featured.subtitle}
          />
          <Link to="/products" className="text-sm font-bold text-primary">
            {d.home.featured.allLink} →
          </Link>
        </div>
        <motion.div
          variants={stagger}
          {...inView}
          className="mt-10 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </section>

      {/* Why */}
      <section className="mt-24 bg-mint py-20">
        <div className="container-page">
          <SectionHeading center eyebrow={d.home.why.eyebrow} title={d.home.why.title} />
          <motion.div
            variants={stagger}
            {...inView}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {(d.home.why.items as readonly { title: string; text: string }[]).map((item, i) => (
              <FeatureCard
                key={item.title}
                icon={(whyIcons as Record<number, React.ReactNode>)[i]}
                title={item.title}
                text={item.text}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* About intro */}
      <section className="container-page mt-24 grid items-center gap-12 lg:grid-cols-2">
        <motion.img
          variants={imageReveal}
          {...inView}
          src="/assets/about/company-image.webp"
          alt="Production line of detergent bottles"
          width={1408}
          height={1008}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
        />
        <div>
          <SectionHeading
            eyebrow={d.home.about.eyebrow}
            title={d.home.about.title}
            subtitle={d.home.about.subtitle}
          />
          <motion.ul variants={stagger} {...inView} className="mt-8 space-y-3">
            {d.home.about.points.map((t) => (
              <motion.li
                variants={fadeUp}
                key={t}
                className="flex items-center gap-3 font-semibold"
              >
                <BadgeCheck className="h-5 w-5 text-fresh" /> {t}
              </motion.li>
            ))}
          </motion.ul>
          <Link to="/about" className={`mt-8 ${buttonVariants({ variant: "soft", size: "pill" })}`}>
            {d.home.about.link}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page mt-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            eyebrow={d.home.faq.eyebrow}
            title={d.home.faq.title}
            subtitle={d.home.faq.subtitle}
          />
          <Link to="/faq" className="mt-6 inline-flex text-sm font-bold text-primary">
            {d.home.faq.allLink} →
          </Link>
        </div>
        <FAQAccordion items={faqs.slice(0, 4)} />
      </section>

      <CtaBanner />
    </>
  );
}

const whyIcons = [
  <Layers className="h-6 w-6" />,
  <Factory className="h-6 w-6" />,
  <Home className="h-6 w-6" />,
  <Headset className="h-6 w-6" />,
];
