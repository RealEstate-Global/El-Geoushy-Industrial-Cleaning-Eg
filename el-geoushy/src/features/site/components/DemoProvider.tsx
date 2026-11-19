"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { DemoData, Locale } from "@/types/site";
import { demoSeed } from "@/features/product/data/product.seed";
import { demoRepository } from "@/lib/repositories/demo-data";

type DemoContextValue = {
  data: DemoData;
  setData: (data: DemoData) => void;
  reset: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DemoData>(demoSeed);
  const [locale, setLocaleState] = useState<Locale>("ar");
  useEffect(() => {
    // Hydrate browser-only overrides after server rendering to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(demoRepository.load());
    const saved = window.localStorage.getItem("new-cetris-locale");
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);
  useEffect(() => {
    document.title = data.settings.pageTitle[locale];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", data.settings.pageDescription[locale]);
  }, [data.settings.pageDescription, data.settings.pageTitle, locale]);
  const save = (next: DemoData) => {
    setData(next);
    demoRepository.save(next);
  };
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("new-cetris-locale", next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };
  const reset = () => {
    setData(demoRepository.reset());
  };
  const value = useMemo(() => ({ data, setData: save, reset, locale, setLocale }), [data, locale]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used inside DemoProvider");
  return value;
}
