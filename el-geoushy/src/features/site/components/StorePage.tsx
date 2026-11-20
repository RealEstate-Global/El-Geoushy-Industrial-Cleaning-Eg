"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpLeft, Check, ChevronLeft, Clock3, Droplets, MessageCircle, Sparkles } from "lucide-react";
import { useDemo } from "./DemoProvider";
import { MapSection } from "./MapSection";
import { translate, translateHome, translatePages } from "@/features/i18n";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";
import type { Locale, Localized, Variant } from "@/types/site";

type PageKind = "home" | "product" | "uses" | "how-to-use" | "offers" | "faq" | "contact";
const text = (value: Localized, locale: Locale) => value[locale];

function ProductVisual({
  label,
  capacity,
  packageType,
  imageSrc = "/assets/products/cetris-hero.png",
}: {
  label: string;
  capacity: string;
  packageType: string;
  imageSrc?: string;
}) {
  return (
    <div
      className="product-stage relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center isolate"
      role="img"
      aria-label={label}
    >
      {/* Radiant ambient glow */}
      <div className="stage-glow absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-radial from-primary/20 via-surface-tint/50 to-transparent blur-2xl -z-10" />

      {/* Decorative Orbits */}
      <div className="stage-orbit orbit-one absolute w-[360px] sm:w-[460px] h-[170px] sm:h-[210px] rounded-full border border-primary/20 -rotate-[28deg] -z-10" />
      <div className="stage-orbit orbit-two absolute w-[320px] sm:w-[410px] h-[130px] sm:h-[165px] rounded-full border border-accent/30 rotate-[24deg] -z-10" />

      {/* Actual Bottle Image */}
      <div className="relative w-full max-w-[280px] sm:max-w-[340px] h-[340px] sm:h-[420px] flex items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out hover:scale-105 z-10"
        />
      </div>

      {/* Floating Glassmorphic Badges */}
      <span className="stage-tag tag-top absolute top-6 sm:top-10 right-2 sm:right-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-surface/90 backdrop-blur-md border border-border shadow-sm text-xs font-bold text-primary z-20">
        <Sparkles size={14} className="text-accent" /> {capacity.toUpperCase()}
      </span>
      <span className="stage-tag tag-side absolute bottom-8 sm:bottom-12 left-2 sm:left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-surface/90 backdrop-blur-md border border-border shadow-sm text-xs font-bold text-ink z-20">
        <Droplets size={14} className="text-primary" /> {packageType.toUpperCase()}
      </span>
      <span className="stage-spark absolute top-12 left-8 sm:left-14 text-2xl text-accent animate-pulse" aria-hidden="true">
        ✳
      </span>
    </div>
  );
}

function Variants({
  selectedVariant,
  onSelect,
}: {
  selectedVariant?: Variant;
  onSelect?: (v: Variant) => void;
}) {
  const { data } = useDemo();
  const variants = data.variants.filter((v) => v.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="variant-row flex items-center gap-3 flex-wrap">
      {variants.map((v) => {
        const isSelected = selectedVariant?.id === v.id;
        return (
          <button
            type="button"
            key={v.id}
            onClick={() => onSelect?.(v)}
            className={`variant-chip inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
              isSelected
                ? "border-primary bg-primary/10 text-primary font-bold shadow-xs ring-2 ring-primary/20"
                : "border-border bg-surface text-ink hover:border-primary/50"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full border border-black/10 shadow-inner block"
              style={{ background: v.color }}
            />
            <span>{v.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function UsesGrid({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  return (
    <div className="uses-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {data.product.uses.map((use, i) => (
        <div
          className="use-item group relative p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
          key={use.ar}
        >
          <div className="flex items-center justify-between">
            <span className="use-number text-xs font-bold text-muted font-mono tracking-wider">0{i + 1}</span>
            <span className="use-arrow text-accent group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
              <ArrowUpLeft size={18} />
            </span>
          </div>
          <h3 className="text-lg font-bold text-ink tracking-tight mt-4">{text(use, locale)}</h3>
        </div>
      ))}
    </div>
  );
}

function HowSteps({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const icons = [<Droplets key="drop" size={20} />, <Clock3 key="clock" size={20} />, <Check key="check" size={20} />];

  return (
    <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.content.howTo.map((step, i) => (
        <article
          className="step-card relative p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
          key={i}
        >
          <div className="flex items-center justify-between">
            <div className="step-icon w-11 h-11 rounded-2xl bg-surface-tint text-primary flex items-center justify-center shadow-xs">
              {icons[i]}
            </div>
            <span className="step-label text-xs font-bold text-muted font-mono tracking-wider">0{i + 1}</span>
          </div>
          <h3 className="text-base font-bold text-ink leading-relaxed mt-5">{text(step, locale)}</h3>
        </article>
      ))}
    </div>
  );
}

function OfferBlock({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const price = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(data.offer.price);
  const quantity = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(data.offer.quantity);
  const currency = data.offer.currency;

  return data.offer.active ? (
    <section className="offer-band relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-primary-dark via-primary to-accent-dark text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-2 z-10 max-w-xl">
        <span className="eyebrow text-accent text-xs font-bold uppercase tracking-wider block">
          {translate(locale).offer}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          {locale === "ar"
            ? `${data.offer.quantity === 2 ? "عبوتان" : `${quantity} عبوات`} بـ${price} ${currency === "EGP" ? "جنيه" : currency}`
            : `${data.offer.quantity} bottles for ${currency} ${data.offer.price}`}
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg">
          {translateHome(locale).offerDemoDescription}
        </p>
      </div>

      <Link
        className="button button-light z-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-primary-dark font-bold text-xs shadow-md hover:bg-slate-50 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        href="/offers"
      >
        {translate(locale).seeOffer}
        <ArrowUpLeft size={16} />
      </Link>

      {/* Decorative background light rings */}
      <span className="offer-orbit absolute -top-24 -right-12 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
      <span className="offer-orbit absolute -bottom-24 -left-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
    </section>
  ) : null;
}

function FaqPreview({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const c = translate(locale);
  const h = translateHome(locale);

  return (
    <section className="section faq-preview max-w-4xl mx-auto w-full">
      <div className="section-heading flex items-end justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow text-xs font-bold text-primary uppercase tracking-wider block">{c.faq}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">{h.faqHeadline}</h2>
        </div>
        <Link
          className="text-link inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all duration-200"
          href="/faq"
        >
          {c.allFaq}
          <ChevronLeft size={16} />
        </Link>
      </div>
      <div className="faq-list space-y-3">
        {data.faqs.slice(0, 3).map((item, i) => (
          <details
            key={i}
            className="faq-item group rounded-2xl border border-border bg-surface p-5 transition-all duration-200 open:shadow-xs hover:border-primary/40"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-sm sm:text-base text-ink select-none">
              <span>{text(item.question, locale)}</span>
              <span className="text-primary text-xl font-light transition-transform duration-300 group-open:rotate-45 ml-3">
                +
              </span>
            </summary>
            <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2.5">
              {text(item.answer, locale)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function StorePage({ kind }: { kind: PageKind }) {
  const { data, locale } = useDemo();
  const c = translate(locale);
  const h = translateHome(locale);
  const p = translatePages(locale);
  const isAr = locale === "ar";

  const [activeVariant, setActiveVariant] = useState<Variant>(
    data.variants[0] ?? {
      id: "variant-01",
      name: "Variant 01",
      color: "#ff7a00",
      colorLabel: { ar: "برتقال", en: "Orange" },
      imagePath: "/assets/products/cetris-orange.png",
      altText: { ar: "", en: "" },
      visible: true,
      order: 1,
    },
  );

  if (kind === "home")
    return (
      <div className="space-y-16 sm:space-y-20 lg:space-y-24">
        {/* Hero Section */}
        <section className="hero wrap pt-8 sm:pt-14 pb-6 sm:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="hero-copy lg:col-span-7 space-y-5">
            <span className="eyebrow inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {h.heroEyebrow}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-tight tracking-tight">
              {text(data.content.heroTitle, locale)}
              <em className="block not-italic text-primary font-bold mt-1 text-[0.88em]">{data.product.name}</em>
            </h1>
            <p className="hero-lede text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              {text(data.content.heroSubtitle, locale)}
            </p>
            <div className="hero-actions flex items-center gap-3 flex-wrap pt-2">
              <Link
                href="/product"
                className="button button-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {c.explore}
                <ArrowUpLeft size={17} />
              </Link>
              <a
                href={getWhatsAppChatUrl(
                  data.settings.whatsappNumber || "+0201016264326",
                  isAr ? "مرحباً، أود الاستفسار عن منتج نيو سيترس" : "Hello, I would like to inquire about NEW CETRiS",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
              >
                <MessageCircle size={17} className="text-[#25D366]" />
                {c.contactCta}
              </a>
            </div>
            <div className="hero-caption flex items-center gap-2 text-xs text-muted pt-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              {c.brandBy}
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <ProductVisual
              label="NEW CETRiS 1-Liter trigger spray bottle"
              capacity={data.product.capacity}
              packageType={data.product.packageType[locale]}
              imageSrc={activeVariant?.imagePath || "/assets/products/cetris-hero.png"}
            />
          </div>
        </section>

        {/* Quick Facts Strip */}
        <section className="quick-facts wrap py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {data.content.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-surface-soft/60 border border-border/40 shadow-xs hover:bg-surface hover:shadow-sm transition-all duration-200"
              >
                <span className="text-xs font-bold text-accent font-mono tracking-wider">0{i + 1}</span>
                <b className="text-sm font-bold text-ink">{text(benefit, locale)}</b>
              </div>
            ))}
          </div>
        </section>

        {/* Variants Section */}
        <section className="section wrap variants-section">
          <div className="section-heading flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow text-xs font-bold text-primary uppercase tracking-wider block">
                {h.variantsEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">{h.variantsTitle}</h2>
              <p className="text-xs text-muted mt-1">{c.provisional}</p>
            </div>
            <Link
              href="/product"
              className="text-link inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all duration-200"
            >
              {c.productDetails}
              <ChevronLeft size={16} />
            </Link>
          </div>
          <Variants selectedVariant={activeVariant} onSelect={setActiveVariant} />
        </section>

        {/* Uses Section */}
        <section className="section uses-section py-16 sm:py-20 bg-surface-soft/40">
          <div className="wrap">
            <div className="section-heading flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="eyebrow text-xs font-bold text-primary uppercase tracking-wider block">
                  {h.usesEyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">{c.uses}</h2>
              </div>
              <Link
                href="/uses"
                className="text-link inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all duration-200"
              >
                {h.exploreUses}
                <ChevronLeft size={16} />
              </Link>
            </div>
            <UsesGrid locale={locale} />
          </div>
        </section>

        {/* How to Use Section */}
        <section className="section wrap how-section">
          <div className="section-heading mb-8">
            <span className="eyebrow text-xs font-bold text-primary uppercase tracking-wider block">
              {c.nav[3]}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1">{c.howTitle}</h2>
          </div>
          <HowSteps locale={locale} />
          <div className="safety-note text-xs text-muted/90 mt-6 p-4 rounded-2xl bg-surface-tint/60 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span>{c.safety}</span>
          </div>
        </section>

        {/* Special Offer Band */}
        <section className="wrap">
          <OfferBlock locale={locale} />
        </section>

        {/* FAQ Preview */}
        <section className="wrap">
          <FaqPreview locale={locale} />
        </section>

        {/* Location Teaser with generous bottom spacing before footer */}
        <section className="wrap location-teaser pb-28 sm:pb-36 lg:pb-40">
          <MapSection compact />
        </section>
      </div>
    );

  if (kind === "contact")
    return (
      <PageIntro title={c.contact} eyebrow={p.contactEyebrow} intro={p.contactIntro}>
        <div className="wrap pb-28 sm:pb-36 lg:pb-40 space-y-8">
          <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold text-2xl shrink-0">
                <MessageCircle size={24} />
              </span>
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                  {isAr ? "محادثة واتساب المباشرة" : "Direct WhatsApp Chat"}
                </span>
                <h3 className="text-xl font-bold text-ink mt-0.5 dir-ltr text-left">
                  +0201016264326
                </h3>
                <p className="text-xs text-muted mt-1">
                  {isAr
                    ? "تواصل معنا مباشرة عبر واتساب لطلب المنتج أو الاستفسار عن الأسعار والمبيعات."
                    : "Chat directly with our team on WhatsApp for orders, pricing, and inquiries."}
                </p>
              </div>
            </div>
            <a
              href={getWhatsAppChatUrl(
                data.settings.whatsappNumber || "+0201016264326",
                isAr ? "مرحباً، أود الاستفسار عن منتج نيو سيترس" : "Hello, I would like to inquire about NEW CETRiS",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageCircle size={18} />
              <span>{isAr ? "تحدث معنا على واتساب" : "Chat on WhatsApp"}</span>
            </a>
          </div>
          <MapSection />
        </div>
      </PageIntro>
    );

  if (kind === "faq")
    return (
      <PageIntro title={c.faq} eyebrow={p.faqEyebrow} intro={p.faqIntro}>
        <div className="wrap max-w-4xl mx-auto space-y-4 pb-28 sm:pb-36 lg:pb-40">
          {data.faqs.map((item, i) => (
            <details
              key={i}
              className="faq-item group rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all duration-200 open:shadow-xs hover:border-primary/40"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-sm sm:text-base text-ink select-none">
                <span>{text(item.question, locale)}</span>
                <span className="text-primary text-xl font-light transition-transform duration-300 group-open:rotate-45 ml-3">
                  +
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2.5">
                {text(item.answer, locale)}
              </p>
            </details>
          ))}
        </div>
      </PageIntro>
    );

  if (kind === "uses")
    return (
      <PageIntro title={c.uses} eyebrow={p.usesEyebrow} intro={data.product.description[locale]}>
        <div className="wrap space-y-8 pb-28 sm:pb-36 lg:pb-40">
          <UsesGrid locale={locale} />
          <div className="safety-note text-xs text-muted/90 p-4 rounded-2xl bg-surface-tint/60 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span>{c.safety}</span>
          </div>
        </div>
      </PageIntro>
    );

  if (kind === "how-to-use")
    return (
      <PageIntro title={c.howTitle} eyebrow={p.directionsEyebrow} intro={p.directionsIntro}>
        <div className="wrap space-y-8 pb-28 sm:pb-36 lg:pb-40">
          <HowSteps locale={locale} />
          <div className="safety-note text-xs text-muted/90 p-4 rounded-2xl bg-surface-tint/60 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span>{c.safety}</span>
          </div>
        </div>
      </PageIntro>
    );

  if (kind === "offers")
    return (
      <PageIntro title={c.offer} eyebrow={p.offerEyebrow} intro={p.offerIntro}>
        <div className="wrap space-y-8 pb-28 sm:pb-36 lg:pb-40">
          <OfferBlock locale={locale} />
          <div className="safety-note text-xs text-muted/90 p-4 rounded-2xl bg-surface-tint/60 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span>{p.offerNote}</span>
          </div>
        </div>
      </PageIntro>
    );

  return (
    <PageIntro
      title={p.productTitle}
      eyebrow={p.productEyebrow}
      intro={data.product.description[locale]}
    >
      <div className="wrap pb-28 sm:pb-36 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <ProductVisual
              label="NEW CETRiS 1-Liter trigger spray bottle"
              capacity={data.product.capacity}
              packageType={data.product.packageType[locale]}
              imageSrc={activeVariant?.imagePath || "/assets/products/cetris-hero.png"}
            />
          </div>
          <div className="lg:col-span-6 space-y-5">
            <div className="detail-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-surface-soft border border-border text-xs font-bold text-muted">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              {data.product.packageType[locale]} · {data.product.capacity}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              {isAr ? data.product.arabicName : data.product.name}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {data.product.description[locale]}
            </p>
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-ink">{p.availableVariants}</h3>
              <Variants selectedVariant={activeVariant} onSelect={setActiveVariant} />
              <p className="provisional-note text-xs text-muted/80">{c.provisional}</p>
            </div>
            <div className="pt-3 flex items-center gap-3 flex-wrap">
              <a
                className="button button-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-[#25D366] hover:bg-[#20ba5a] border-0"
                href={getWhatsAppChatUrl(
                  data.settings.whatsappNumber || "+0201016264326",
                  isAr ? `مرحباً، أود طلب عبوة ${data.product.arabicName}` : `Hello, I would like to order ${data.product.name}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                {isAr ? "طلب عبر واتساب" : "Order via WhatsApp"}
                <ArrowUpLeft size={17} />
              </a>
              <Link
                className="button button-outline inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
                href="/contact"
              >
                {c.contactCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageIntro>
  );
}

function PageIntro({
  title,
  eyebrow,
  intro,
  children,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-hero wrap py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="eyebrow text-xs font-bold text-primary uppercase tracking-wider block">{eyebrow}</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight">{title}</h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">{intro}</p>
        </div>
        <span
          className="page-hero-mark absolute top-10 left-10 text-[200px] font-serif font-black text-surface-soft select-none -z-10 pointer-events-none opacity-50"
          aria-hidden="true"
        >
          C
        </span>
      </section>
      {children}
    </>
  );
}
