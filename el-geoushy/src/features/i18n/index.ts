import { ar } from "./data/ar";
import { en } from "./data/en";
import type { Locale } from "@/types/site";
export const dictionaries = { ar, en } as const;
export function translate(locale: Locale) {
  return dictionaries[locale].common;
}
export function translateHome(locale: Locale) {
  return dictionaries[locale].home;
}
export function translatePages(locale: Locale) {
  return dictionaries[locale].pages;
}
