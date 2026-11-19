"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { DemoData, Locale } from "@/types/site";
import { demoSeed } from "@/features/product/data/product.seed";
import { demoRepository } from "@/lib/repositories/demo-data";

type DemoContextValue = {
  data: DemoData;
  setData: (data: DemoData) => void;
  reset: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: "light" | "dark";
  toggleTheme: (origin?: { x: number; y: number }) => void;
};
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DemoData>(demoSeed);
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    // Hydrate browser-only overrides after server rendering to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(demoRepository.load());
    const savedTheme = window.localStorage.getItem("new-cetris-theme");
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : document.documentElement.dataset.theme === "dark"
          ? "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
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
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next = theme === "dark" ? "light" : "dark";
      const applyTheme = () => {
        setTheme(next);
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem("new-cetris-theme", next);
      };
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => { ready: Promise<void> };
      };
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion || !doc.startViewTransition) {
        applyTheme();
        return;
      }
      const transition = doc.startViewTransition(applyTheme);
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      void transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    },
    [theme],
  );
  const reset = () => {
    setData(demoRepository.reset());
  };
  const value = useMemo(
    () => ({ data, setData: save, reset, locale, setLocale, theme, toggleTheme }),
    [data, locale, theme, toggleTheme],
  );
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used inside DemoProvider");
  return value;
}
