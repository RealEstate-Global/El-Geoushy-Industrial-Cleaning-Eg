import type { Locale } from "./locale";
import { en } from "./en";
import type { Dictionary } from "./en";
import { ar } from "./ar";

/** Every locale must satisfy the English dictionary shape (checked at compile time). */
export const locales: Record<Locale, Dictionary> = { ar, en };

export type { Dictionary, Locale };
