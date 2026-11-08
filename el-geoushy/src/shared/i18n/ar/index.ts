import type { Dictionary } from "../en";
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

/** Arabic dictionary — structurally checked against the English shape. */
export const ar: Dictionary = {
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
