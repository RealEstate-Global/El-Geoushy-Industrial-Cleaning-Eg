import { useDict } from "@/shared/i18n/LocaleProvider";
import { LegalPage } from "@/features/legal/components/LegalPage";

export function PrivacyPage() {
  const d = useDict();
  return (
    <LegalPage
      title={d.common.legalNav.privacy}
      crumb={d.legal.privacy.crumb}
      sections={[...d.legal.privacy.sections]}
    />
  );
}
