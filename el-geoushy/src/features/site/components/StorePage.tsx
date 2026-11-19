"use client";

import Link from "next/link";
import { ArrowUpLeft, Check, ChevronLeft, Clock3, Droplets, Sparkles } from "lucide-react";
import { useDemo } from "./DemoProvider";
import { MapSection } from "./MapSection";
import { translate, translateHome, translatePages } from "@/features/i18n";
import type { Locale, Localized } from "@/types/site";

type PageKind = "home" | "product" | "uses" | "how-to-use" | "offers" | "faq" | "contact";
const text = (value: Localized, locale: Locale) => value[locale];
function ProductVisual({
  label,
  capacity,
  packageType,
}: {
  label: string;
  capacity: string;
  packageType: string;
}) {
  return (
    <div className="product-stage photo-placeholder" role="img" aria-label={label}>
      <div className="stage-glow" />
      <div className="photo-placeholder-inner">
        <div className="placeholder-symbol">
          <Droplets size={42} />
        </div>
        <span>NEW CETRiS</span>
        <small>
          {capacity.toUpperCase()} · {packageType.toUpperCase()}
        </small>
        <em>صورة المنتج الفعلية قريبًا · Actual product photo needed</em>
      </div>
      <span className="stage-tag tag-top">
        <Sparkles size={14} /> {capacity.toUpperCase()}
      </span>
      <span className="stage-tag tag-side">{packageType.toUpperCase()}</span>
      <span className="stage-spark">✳</span>
    </div>
  );
}
function Variants() {
  const { data } = useDemo();
  const variants = data.variants.filter((v) => v.visible).sort((a, b) => a.order - b.order);
  return (
    <div className="variant-row">
      {variants.map((v) => (
        <div className="variant-chip" key={v.id}>
          <span style={{ background: v.color }} />
          {v.name}
        </div>
      ))}
    </div>
  );
}
function UsesGrid({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  return (
    <div className="uses-grid">
      {data.product.uses.map((use, i) => (
        <div className="use-item" key={use.ar}>
          <span className="use-number">0{i + 1}</span>
          <h3>{text(use, locale)}</h3>
          <span className="use-arrow">
            <ArrowUpLeft size={18} />
          </span>
        </div>
      ))}
    </div>
  );
}
function HowSteps({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const icons = [<Droplets key="drop" />, <Clock3 key="clock" />, <Check key="check" />];
  return (
    <div className="steps-grid">
      {data.content.howTo.map((step, i) => (
        <article className="step-card" key={i}>
          <div className="step-icon">{icons[i]}</div>
          <span className="step-label">0{i + 1}</span>
          <h3>{text(step, locale)}</h3>
        </article>
      ))}
    </div>
  );
}
function OfferBlock({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const price = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(data.offer.price);
  const quantity = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(
    data.offer.quantity,
  );
  const currency = data.offer.currency;
  return data.offer.active ? (
    <section className="offer-band">
      <div>
        <span className="eyebrow">{translate(locale).offer}</span>
        <h2>
          {locale === "ar"
            ? `${data.offer.quantity === 2 ? "عبوتان" : `${quantity} عبوات`} بـ${price} ${currency === "EGP" ? "جنيه" : currency}`
            : `${data.offer.quantity} bottles for ${currency} ${data.offer.price}`}
        </h2>
        <p>{translateHome(locale).offerDemoDescription}</p>
      </div>
      <Link className="button button-light" href="/offers">
        {translate(locale).seeOffer}
        <ArrowUpLeft size={17} />
      </Link>
      <span className="offer-orbit" />
    </section>
  ) : null;
}
function FaqPreview({ locale }: { locale: Locale }) {
  const { data } = useDemo();
  const c = translate(locale);
  const h = translateHome(locale);
  return (
    <section className="section faq-preview">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.faq}</span>
          <h2>{h.faqHeadline}</h2>
        </div>
        <Link className="text-link" href="/faq">
          {c.allFaq}
          <ChevronLeft size={17} />
        </Link>
      </div>
      <div className="faq-list">
        {data.faqs.slice(0, 3).map((item, i) => (
          <details key={i} className="faq-item">
            <summary>
              {text(item.question, locale)}
              <span>+</span>
            </summary>
            <p>{text(item.answer, locale)}</p>
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
  if (kind === "home")
    return (
      <>
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {h.heroEyebrow}
            </span>
            <h1>
              {text(data.content.heroTitle, locale)}
              <em>{data.product.name}</em>
            </h1>
            <p className="hero-lede">{text(data.content.heroSubtitle, locale)}</p>
            <div className="hero-actions">
              <Link href="/product" className="button button-primary">
                {c.explore}
                <ArrowUpLeft size={18} />
              </Link>
              <a
                href={data.settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
              >
                {c.contactCta}
              </a>
            </div>
            <div className="hero-caption">
              <span /> {c.brandBy}
            </div>
          </div>
          <ProductVisual
            label="Placeholder for the NEW CETRiS trigger spray product photo"
            capacity={data.product.capacity}
            packageType={data.product.packageType[locale]}
          />
        </section>
        <section className="quick-facts wrap">
          {data.content.benefits.map((benefit, i) => (
            <div key={i}>
              <span>0{i + 1}</span>
              <b>{text(benefit, locale)}</b>
            </div>
          ))}
        </section>
        <section className="section wrap variants-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{h.variantsEyebrow}</span>
              <h2>{h.variantsTitle}</h2>
              <p>{c.provisional}</p>
            </div>
            <Link href="/product" className="text-link">
              {c.productDetails}
              <ChevronLeft size={17} />
            </Link>
          </div>
          <Variants />
        </section>
        <section className="section uses-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{h.usesEyebrow}</span>
                <h2>{c.uses}</h2>
              </div>
              <Link href="/uses" className="text-link">
                {h.exploreUses}
                <ChevronLeft size={17} />
              </Link>
            </div>
            <UsesGrid locale={locale} />
          </div>
        </section>
        <section className="section wrap how-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.nav[3]}</span>
              <h2>{c.howTitle}</h2>
            </div>
          </div>
          <HowSteps locale={locale} />
          <p className="safety-note">{c.safety}</p>
        </section>
        <div className="wrap">
          <OfferBlock locale={locale} />
        </div>
        <FaqPreview locale={locale} />
        <div className="wrap location-teaser">
          <MapSection compact />
        </div>
      </>
    );
  if (kind === "contact")
    return (
      <PageIntro title={c.contact} eyebrow={p.contactEyebrow} intro={p.contactIntro}>
        <div className="wrap">
          <MapSection />
        </div>
      </PageIntro>
    );
  if (kind === "faq")
    return (
      <PageIntro title={c.faq} eyebrow={p.faqEyebrow} intro={p.faqIntro}>
        <div className="wrap faq-full faq-list">
          {data.faqs.map((item, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary>
                {text(item.question, locale)}
                <span>+</span>
              </summary>
              <p>{text(item.answer, locale)}</p>
            </details>
          ))}
        </div>
      </PageIntro>
    );
  if (kind === "uses")
    return (
      <PageIntro title={c.uses} eyebrow={p.usesEyebrow} intro={data.product.description[locale]}>
        <div className="wrap page-section">
          <UsesGrid locale={locale} />
          <p className="safety-note">{c.safety}</p>
        </div>
      </PageIntro>
    );
  if (kind === "how-to-use")
    return (
      <PageIntro title={c.howTitle} eyebrow={p.directionsEyebrow} intro={p.directionsIntro}>
        <div className="wrap page-section">
          <HowSteps locale={locale} />
          <p className="safety-note">{c.safety}</p>
        </div>
      </PageIntro>
    );
  if (kind === "offers")
    return (
      <PageIntro title={c.offer} eyebrow={p.offerEyebrow} intro={p.offerIntro}>
        <div className="wrap offer-page">
          <OfferBlock locale={locale} />
          <p className="safety-note">{p.offerNote}</p>
        </div>
      </PageIntro>
    );
  return (
    <PageIntro
      title={p.productTitle}
      eyebrow={p.productEyebrow}
      intro={data.product.description[locale]}
    >
      <div className="wrap product-detail">
        <ProductVisual
          label="Placeholder for the NEW CETRiS product photo"
          capacity={data.product.capacity}
          packageType={data.product.packageType[locale]}
        />
        <div>
          <div className="detail-pill">
            <span /> {data.product.packageType[locale]} · {data.product.capacity}
          </div>
          <h2>{isAr ? data.product.arabicName : data.product.name}</h2>
          <p>{data.product.description[locale]}</p>
          <h3>{p.availableVariants}</h3>
          <Variants />
          <p className="provisional-note">{c.provisional}</p>
          <Link className="button button-primary" href="/contact">
            {c.contactCta}
            <ArrowUpLeft size={18} />
          </Link>
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
      <section className="page-hero wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        <span className="page-hero-mark">C</span>
      </section>
      {children}
    </>
  );
}
