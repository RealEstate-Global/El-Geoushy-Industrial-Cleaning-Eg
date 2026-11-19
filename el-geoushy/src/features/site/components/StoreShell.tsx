"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpLeft,
  Star,
  Facebook,
  MessageCircle,
  Globe2,
  Moon,
  Sun,
} from "lucide-react";
import { useDemo } from "./DemoProvider";
import { translate, translateHome } from "@/features/i18n";
import { getVerifiedWhatsAppUrl } from "@/lib/whatsapp";

const paths = ["/", "/product", "/uses", "/how-to-use", "/offers", "/faq", "/contact"];
export function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, setLocale, data, theme, toggleTheme } = useDemo();
  const c = translate(locale);
  const h = translateHome(locale);
  const [open, setOpen] = useState(false);
  const whatsapp = getVerifiedWhatsAppUrl(
    data.settings.whatsappNumber,
    data.settings.whatsappNumberNeedsVerification,
  );
  if (pathname.startsWith("/admin")) return <div dir="ltr">{children}</div>;
  return (
    <div className="store-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="topline">
        <span>{c.brandBy}</span>
        <span className="topline-dot" /> <span>{h.madeInEgypt}</span>
      </div>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="NEW CETRiS home">
          <span className="wordmark-mark">C</span>
          <span>
            NEW <b>CETRiS</b>
            <small>EL-GIOUSHY</small>
          </span>
        </Link>
        <button
          className="icon-button mobile-menu"
          aria-label={c.navToggle}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "main-nav is-open" : "main-nav"}>
          {c.nav.map((label, i) => (
            <Link key={paths[i]} href={paths[i] ?? "/"} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? c.lightMode : c.darkMode}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? c.lightMode : c.darkMode}
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              toggleTheme({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
            }}
          >
            <span key={theme} className="theme-icon" aria-hidden="true">
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </span>
          </button>
          <button
            className="language-button"
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
          >
            <Globe2 size={16} />
            {c.language}
          </button>
          <a
            className="button button-primary header-cta"
            href={whatsapp ?? data.settings.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.contactCta}
            <ArrowUpLeft size={16} />
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark footer-mark">
              <span className="wordmark-mark">C</span>
              <span>
                NEW <b>CETRiS</b>
                <small>EL-GIOUSHY</small>
              </span>
            </Link>
            <p>{c.brandBy}</p>
          </div>
          <div className="footer-links">
            <Link href="/product">{c.nav[1]}</Link>
            <Link href="/uses">{c.nav[2]}</Link>
            <Link href="/faq">{c.nav[5]}</Link>
            <Link href="/contact">{c.nav[6]}</Link>
          </div>
          <div className="footer-social">
            <a href={data.settings.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook size={17} />
              {c.facebook}
            </a>
            <a href={data.settings.googleReviewUrl} target="_blank" rel="noopener noreferrer">
              <Star size={17} />
              {c.review}
            </a>
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} />
                WhatsApp
              </a>
            ) : (
              <span className="muted">
                <MessageCircle size={17} />
                {c.whatsappFallback}
              </span>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© NEW CETRiS · {c.address}</span>
          <span>{c.footerNote}</span>
          <Link href="/admin">Admin demo</Link>
        </div>
      </footer>
      {!whatsapp && (
        <a
          className="contact-fab"
          href={data.settings.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={locale === "ar" ? "تواصل معنا على Facebook" : "Contact us on Facebook"}
        >
          <MessageCircle />
          <span>{locale === "ar" ? "تواصل معنا" : "Contact us"}</span>
        </a>
      )}
    </div>
  );
}
