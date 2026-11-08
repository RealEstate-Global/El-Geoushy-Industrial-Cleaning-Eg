import { useDict } from "@/shared/i18n/LocaleProvider";
import { LegalPage } from "@/features/legal/components/LegalPage";

export function TermsPage() {
  const d = useDict();
  return (
    <LegalPage
      title={d.common.legalNav.terms}
      crumb={d.legal.terms.crumb}
      sections={[...d.legal.terms.sections]}
    />
  );
}
