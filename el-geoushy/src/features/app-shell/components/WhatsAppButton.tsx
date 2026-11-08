import { buttonVariants } from "@/shared/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { whatsappLink } from "@/shared/config/site";
import { useDict } from "@/shared/i18n/LocaleProvider";

/** Renders a WhatsApp link only when a verified number is configured; otherwise links to /contact. */
export function WhatsAppButton({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  const d = useDict();
  const href = whatsappLink(message);
  const cls = `${buttonVariants({ variant: "whatsapp", size: "pill" })} ${className}`;
  if (!href)
    return (
      <Link to="/contact" className={cls}>
        <MessageCircle className="h-4 w-4" /> {d.common.whatsapp.fallback}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      <MessageCircle className="h-4 w-4" /> {d.common.whatsapp.label}
    </a>
  );
}

export function FloatingWhatsApp() {
  const d = useDict();
  const href = whatsappLink(d.contact.whatsapp.message);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={d.common.whatsapp.label}
      className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-fresh text-fresh-foreground shadow-lift transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
