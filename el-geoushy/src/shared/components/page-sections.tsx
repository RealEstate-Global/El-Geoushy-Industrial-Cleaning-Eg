import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft, FlaskConical, SearchX, TriangleAlert } from "lucide-react";
import { buttonVariants } from "@/shared/ui/button";
import { fadeUp, inView } from "@/shared/lib/motion";
import { useDict } from "@/shared/i18n/LocaleProvider";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      {...inView}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <p className="mb-3 text-sm font-bold text-fresh">{eyebrow}</p>}
      <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-8 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: { label: string; to?: string }[];
}) {
  return (
    <section className="bg-gradient-hero border-b">
      <div className="container-page py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const d = useDict();
  return (
    <nav aria-label="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground">
            {d.common.home}
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <ChevronLeft className="h-3.5 w-3.5" />
            {it.to ? (
              <a href={it.to} className="hover:text-foreground">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="font-semibold text-foreground">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function DemoBadge() {
  const d = useDict();
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-bold text-foreground">
      <FlaskConical className="h-3 w-3" /> {d.common.demoBadge}
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
    </motion.div>
  );
}

export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <div className="aspect-square animate-pulse bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed bg-card px-6 py-16 text-center">
      <SearchX className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ text }: { text: string }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm"
    >
      <TriangleAlert className="h-5 w-5 text-destructive" /> {text}
    </div>
  );
}

export function CtaBanner() {
  const d = useDict();
  return (
    <section className="container-page mt-24">
      <motion.div
        variants={fadeUp}
        {...inView}
        className="bg-gradient-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center text-on-brand sm:px-12"
      >
        <div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-on-brand/10"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-on-brand/10"
          aria-hidden
        />
        <h2 className="relative text-2xl font-extrabold sm:text-4xl">{d.cta.title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl leading-8 opacity-90">{d.cta.text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className={buttonVariants({ variant: "onBrand", size: "pill" })}>
            {d.common.contactUs}
          </Link>
          <Link
            to="/products"
            className={buttonVariants({ variant: "onBrandOutline", size: "pill" })}
          >
            {d.common.browseProducts}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
