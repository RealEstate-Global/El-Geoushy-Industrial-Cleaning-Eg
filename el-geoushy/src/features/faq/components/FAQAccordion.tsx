import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((f, i) => (
        <AccordionItem
          key={f.q}
          value={`f-${i}`}
          className="rounded-2xl border bg-card px-5 shadow-soft"
        >
          <AccordionTrigger className="text-start text-base font-bold hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
