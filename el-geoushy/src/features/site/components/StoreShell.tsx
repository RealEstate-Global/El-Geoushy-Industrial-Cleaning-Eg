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
  Instagram,
  Twitter,
  Music,
  Pin,
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
    <div className="store-shell min-h-screen flex flex-col" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Main Sticky Header */}
      <header className="site-header sticky top-0 z-40 backdrop-blur-md bg-surface/95 border-b border-border/30 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="wordmark flex items-center gap-3 group" aria-label="NEW CETRiS home">
              <span className="wordmark-mark rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs transition-transform duration-200 group-hover:scale-105">
                C
              </span>
              <span className="leading-tight">
                NEW <b className="text-primary font-extrabold tracking-wider">CETRiS</b>
                <small className="block text-[9px] uppercase tracking-widest text-muted mt-0.5">EL-GIOUSHY</small>
              </span>
            </Link>
            <span className="hidden lg:inline-flex items-center text-[10px] font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              {h.madeInEgypt}
            </span>
          </div>

          <button
            className="icon-button mobile-menu p-2 rounded-2xl md:hidden text-ink hover:bg-surface-soft"
            aria-label={c.navToggle}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation */}
          <nav className={open ? "main-nav is-open" : "main-nav"}>
            {c.nav.map((label, i) => {
              const href = paths[i] ?? "/";
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-semibold transition-colors duration-200 py-1.5 px-2.5 rounded-xl ${
                    isActive ? "text-primary font-bold bg-primary/10" : "text-muted hover:text-primary hover:bg-surface-soft"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions flex items-center gap-2 sm:gap-3">
            <button
              className="theme-toggle rounded-2xl p-2.5 transition-all duration-200 hover:scale-105"
              type="button"
              aria-label={theme === "dark" ? c.lightMode : c.darkMode}
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? c.lightMode : c.darkMode}
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                toggleTheme({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
              }}
            >
              <span key={theme} className="theme-icon block" aria-hidden="true">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </button>

            <button
              className="language-button flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-2xl border border-border bg-surface-soft hover:bg-surface hover:border-primary transition-all duration-200"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              aria-label={c.language}
            >
              <Globe2 size={16} />
              <span className="hidden sm:inline">{c.language}</span>
            </button>

            <a
              className="button button-primary header-cta hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              href={whatsapp ?? data.settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.contactCta}
              <ArrowUpLeft size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Modernized Site Footer */}
      <footer className="site-footer bg-surface-dark text-white border-t border-white/10 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="footer-top grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/" className="wordmark footer-mark flex items-center gap-3" aria-label="NEW CETRiS home">
                <span className="wordmark-mark rounded-2xl flex items-center justify-center font-bold text-xl text-primary bg-surface-tint border border-accent/30 shadow-xs">
                  C
                </span>
                <span>
                  NEW <b className="text-accent font-extrabold tracking-wider">CETRiS</b>
                  <small className="block text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">EL-GIOUSHY</small>
                </span>
              </Link>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">{c.brandBy}</p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{data.settings.address[locale] || c.address}</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                {locale === "ar" ? "روابط سريعة" : "Quick Links"}
              </span>
              <div className="footer-links flex flex-col gap-2.5">
                <Link href="/product" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[1]}
                </Link>
                <Link href="/uses" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[2]}
                </Link>
                <Link href="/how-to-use" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[3]}
                </Link>
                <Link href="/offers" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[4]}
                </Link>
                <Link href="/faq" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[5]}
                </Link>
                <Link href="/contact" className="text-xs text-slate-300 hover:text-accent transition-colors duration-200">
                  {c.nav[6]}
                </Link>
              </div>
            </div>

            {/* Column 3: Social & Connect Badges */}
            <div className="md:col-span-4 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                {locale === "ar" ? "قنوات التواصل" : "Connect With Us"}
              </span>
              <p className="text-xs text-slate-300">
                {locale === "ar"
                  ? "تواصل معنا مباشرة عبر المنصات الرسمية للجيوشي للمنظفات الصناعية."
                  : "Reach out directly via official El-Gioushy Detergents channels."}
              </p>
              <div className="footer-social flex items-center gap-2.5 flex-wrap pt-1">
                {/* Facebook Badge */}
                {data.settings.facebook && (
                  <a
                    href={data.settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title={c.facebook}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 hover:bg-[#1877F2]/25 text-white hover:text-sky-300 border border-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Facebook size={18} />
                  </a>
                )}

                {/* WhatsApp Badge */}
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#25D366]/20 hover:bg-[#25D366]/35 text-[#8ed7ae] border border-[#25D366]/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <MessageCircle size={18} />
                  </a>
                ) : (
                  <span
                    title={c.whatsappFallback}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 text-slate-400 border border-white/5 cursor-not-allowed opacity-60"
                  >
                    <MessageCircle size={18} />
                  </span>
                )}

                {/* Google Reviews Badge */}
                {data.settings.googleReviewUrl && (
                  <a
                    href={data.settings.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Reviews"
                    title={c.review}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-400/15 hover:bg-amber-400/30 text-amber-300 border border-amber-400/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Star size={18} />
                  </a>
                )}

                {/* TikTok Badge if available */}
                {data.settings.tiktok && (
                  <a
                    href={data.settings.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    title="TikTok"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Music size={18} />
                  </a>
                )}

                {/* X Badge if available */}
                {data.settings.x && (
                  <a
                    href={data.settings.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    title="X"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Twitter size={18} />
                  </a>
                )}

                {/* Pinterest Badge if available */}
                {data.settings.pinterest && (
                  <a
                    href={data.settings.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    title="Pinterest"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#E60023]/20 hover:bg-[#E60023]/35 text-rose-300 border border-[#E60023]/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Pin size={18} />
                  </a>
                )}

                {/* Instagram Badge ONLY IF NON-EMPTY (preserving user rule: "hide unknown Instagram") */}
                {data.settings.instagram && (
                  <a
                    href={data.settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-pink-500/20 hover:bg-pink-500/35 text-pink-300 border border-pink-500/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} NEW CETRiS · {c.address}</span>
            <span>{c.footerNote}</span>
            <Link
              href="/admin"
              className="text-accent hover:underline px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
            >
              Admin demo
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (FAB) */}
      {!whatsapp && (
        <a
          className="contact-fab fixed z-50 bottom-6 left-6 flex items-center gap-2.5 rounded-full px-5 py-3 text-white bg-accent-dark shadow-fab hover:shadow-xl transition-all duration-200 hover:scale-105"
          href={data.settings.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={locale === "ar" ? "تواصل معنا على Facebook" : "Contact us on Facebook"}
        >
          <MessageCircle size={19} />
          <span className="font-bold text-xs">{locale === "ar" ? "تواصل معنا" : "Contact us"}</span>
        </a>
      )}
    </div>
  );
}
