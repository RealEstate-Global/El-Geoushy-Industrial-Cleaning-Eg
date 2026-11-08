import { Link } from "@tanstack/react-router";
import { siteShortName } from "@/shared/config/site";
import { useDict, useLocale } from "@/shared/i18n/LocaleProvider";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const d = useDict();
  const { locale } = useLocale();
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={siteShortName(locale)}>
      <img src="/assets/brand/logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
      <span className="flex flex-col leading-tight">
        <span
          className={`text-base font-extrabold ${inverted ? "text-navy-foreground" : "text-foreground"}`}
        >
          {siteShortName(locale)}
        </span>
        <span
          className={`text-[11px] font-medium ${inverted ? "text-navy-foreground/70" : "text-muted-foreground"}`}
        >
          {d.common.brandSuffix}
        </span>
      </span>
    </Link>
  );
}
