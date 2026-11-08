import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import { PageHero } from "@/shared/components/page-sections";
import { useDict, useLocale } from "@/shared/i18n/LocaleProvider";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { WhatsAppButton } from "@/features/app-shell/components/WhatsAppButton";

export function ContactPage() {
  const d = useDict();
  const c = siteConfig.contact;
  const rows: { icon: typeof Phone; label: string; v: string | null }[] = [
    { icon: Phone, label: d.contact.details.rows.phone, v: c.phone },
    { icon: Mail, label: d.contact.details.rows.email, v: c.email },
    { icon: MapPin, label: d.contact.details.rows.address, v: c.address },
    { icon: Clock, label: d.contact.details.rows.hours, v: c.workingHours },
  ].filter((r) => r.v);
  return (
    <>
      <PageHero
        title={d.contact.title}
        subtitle={d.contact.subtitle}
        crumbs={[{ label: d.contact.crumb }]}
      />
      <div className="container-page mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <ContactForm />
        <aside className="space-y-5">
          <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
            <h2 className="text-lg font-bold">{d.contact.details.title}</h2>
            {rows.length ? (
              <ul className="mt-4 space-y-3 text-sm">
                {rows.map((r) => (
                  <li key={r.label} className="flex gap-3">
                    <r.icon className="h-5 w-5" />
                    <span>{r.v}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-7 text-navy-foreground/75">
                {d.contact.details.pending}
              </p>
            )}
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">{d.contact.whatsapp.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.contact.whatsapp ? d.contact.whatsapp.ready : d.contact.whatsapp.pending}
            </p>
            <WhatsAppButton message={d.contact.whatsapp.message} className="mt-4" />
          </div>
        </aside>
      </div>
    </>
  );
}
