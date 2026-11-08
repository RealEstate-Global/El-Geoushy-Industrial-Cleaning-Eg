import { buttonVariants } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Languages, Menu, X } from "lucide-react";
import { navRoutes, type NavKey } from "@/shared/config/site";
import { ThemeToggle } from "@/shared/providers/theme";
import { useDict, useLocale } from "@/shared/i18n/LocaleProvider";
import type { Locale } from "@/shared/i18n/locale";
import { Logo } from "./Logo";

export function AnnouncementBar() {
  const d = useDict();
  return (
    <div className="bg-navy text-navy-foreground">
      <p className="container-page py-2 text-center text-xs sm:text-sm">{d.header.announcement}</p>
    </div>
  );
}

function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const next: Locale = locale === "ar" ? "en" : "ar";
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={() => setLocale(next)}
      title={locale === "ar" ? "Switch to English" : "التحويل إلى العربية"}
      aria-label={locale === "ar" ? "Switch to English" : "التحويل إلى العربية"}
      className={`inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-3 text-xs font-semibold text-foreground transition-colors hover:bg-accent ${className}`}
    >
      <Languages className="h-4 w-4" /> {locale === "ar" ? "EN" : "عربي"}
    </motion.button>
  );
}

const linkCls =
  "rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-muted";
const activeCls = "!text-primary bg-secondary";

export function Header() {
  const d = useDict();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all ${scrolled ? "bg-background/90 shadow-soft backdrop-blur" : "border-transparent bg-background"}`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo />
        <nav aria-label={d.header.mainNavAria} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navRoutes.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={linkCls}
                  activeProps={{ className: activeCls }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {d.common.nav[l.key as NavKey]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Link
            to="/products"
            className={`hidden md:inline-flex ${buttonVariants({ variant: "brand", size: "pill" })}`}
          >
            {d.header.browse}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={d.header.openMenu}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={d.header.mobileNavAria}
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-background p-5 shadow-lift lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label={d.header.closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {navRoutes.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-muted"
                      activeProps={{ className: "bg-secondary !text-primary" }}
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      {d.common.nav[l.key as NavKey]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                  <span className="text-sm font-semibold">{d.header.appearance}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                  <span className="text-sm font-semibold">
                    <Languages className="me-2 inline h-4 w-4" />
                    {locale === "ar" ? "English" : "العربية"}
                  </span>
                  <LanguageToggle />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
