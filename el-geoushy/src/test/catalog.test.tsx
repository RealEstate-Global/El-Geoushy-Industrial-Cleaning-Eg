import { describe, expect, it } from "vitest";
import { filterProducts } from "@/features/catalog/lib/catalog-queries";
import { contactSchema } from "@/features/contact/lib/schema";
import { whatsappLink } from "@/shared/config/site";

describe("catalog", () => {
  it("filters by category", () => {
    expect(
      filterProducts({ category: "industrial" }).every((p) => p.categoryId === "industrial"),
    ).toBe(true);
  });
  it("returns empty for unmatched search", () => {
    expect(filterProducts({ q: "zzzz" })).toHaveLength(0);
  });
});

describe("contact & whatsapp", () => {
  it("WhatsApp link uses the configured number", () => {
    expect(whatsappLink("مرحبا")).toBe(
      "https://wa.me/201016264326?text=" + encodeURIComponent("مرحبا"),
    );
  });
  it("email is optional, phone must be Egyptian mobile", () => {
    const base = { name: "أحمد", email: "", subject: "استفسار", message: "رسالة تجريبية طويلة" };
    expect(contactSchema.safeParse({ ...base, phone: "01012345678" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, phone: "12345" }).success).toBe(false);
  });
});
