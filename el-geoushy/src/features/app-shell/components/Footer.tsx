import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import {
  navRoutes,
  siteConfig,
  siteDescription,
  siteName,
  type NavKey,
} from "@/shared/config/site";
import { useDict, useLocale } from "@/shared/i18n/LocaleProvider";
import { categories } from "@/features/catalog/data/catalog";
import { Logo } from "./Logo";

export function Footer() {
  const d = useDict();
  const { locale } = useLocale();
  const c = siteConfig.contact;
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v) as [string, string][];
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="text-sm leading-7 text-navy-foreground/75">{siteDescription(locale)}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold">{d.footer.quickLinks}</h2>
          <ul className="space-y-2.5 text-sm text-navy-foreground/75">
            {navRoutes.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-navy-foreground">
                  {d.common.nav[l.key as NavKey]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold">{d.footer.categories}</h2>
          <ul className="space-y-2.5 text-sm text-navy-foreground/75">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to="/products"
                  search={{ category: cat.id }}
                  className="hover:text-navy-foreground"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold">{d.footer.contact}</h2>
          <ul className="space-y-3 text-sm text-navy-foreground/75">
            {c.phone && (
              <li className="flex gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${c.phone}`} dir="ltr">
                  {c.phone}
                </a>
              </li>
            )}
            {c.email && (
              <li className="flex gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </li>
            )}
            {c.address && (
              <li className="flex gap-2">
                <MapPin className="h-4 w-4" />
                {c.address}
              </li>
            )}
            {!c.phone && !c.email && !c.address && (
              <li>
                {d.footer.contactNotice.before}{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-navy-foreground underline underline-offset-4"
                >
                  {d.footer.contactNotice.link}
                </Link>
                {d.footer.contactNotice.after}
              </li>
            )}
            {socials.map(([k, v]) => (
              <li key={k}>
                <a
                  href={v}
                  target="_blank"
                  rel="noreferrer"
                  className="capitalize hover:text-navy-foreground"
                >
                  {k}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteName(locale)}. {d.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-navy-foreground">
              {d.common.legalNav.privacy}
            </Link>
            <Link to="/terms" className="hover:text-navy-foreground">
              {d.common.legalNav.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ScrollToTopButton() {
  const d = useDict();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      aria-label={d.footer.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 left-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card text-foreground shadow-soft transition-all hover:-translate-y-1 ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
