import { common } from "./common";
import { header } from "./header";
import { footer } from "./footer";
import { home } from "./home";
import { about } from "./about";
import { catalog } from "./catalog";
import { faq } from "./faq";
import { contact } from "./contact";
import { legal } from "./legal";
import { errors } from "./errors";
import { cta } from "./cta";

/** English dictionary — the shape every other locale must satisfy. */
export const en = {
  common,
  header,
  footer,
  home,
  about,
  catalog,
  faq,
  contact,
  legal,
  errors,
  cta,
};

export type Dictionary = typeof en;
export type LocaleKey = keyof Dictionary;
