import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { locales, type Dictionary, type Locale } from "./index";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  d: Dictionary;
};

const Ctx = createContext<LocaleContextValue>({
  locale: "ar",
  setLocale: () => {},
  d: locales["ar"],
});

const STORAGE_KEY = "locale";

/** Inline script run before paint so the SSR'd `<html lang dir>` matches the stored locale. */
export const localeInitScript = `(function(){try{var l=localStorage.getItem('${STORAGE_KEY}');l=l==='en'?'en':'ar';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'}catch(e){}})();`;

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start with the SSR default (Arabic); sync from the document in an effect to
  // avoid a hydration mismatch — the init script already set `lang`/`dir`.
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    setLocale(document.documentElement.lang === "en" ? "en" : "ar");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value: LocaleContextValue = {
    locale,
    setLocale: (next) => {
      localStorage.setItem(STORAGE_KEY, next);
      setLocale(next);
    },
    d: locales[locale],
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
/** `d` is the dictionary for the active locale. */
export const useDict = () => useContext(Ctx).d;

export type { Locale } from "./locale";
