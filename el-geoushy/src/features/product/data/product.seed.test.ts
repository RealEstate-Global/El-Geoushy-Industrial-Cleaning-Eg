import { describe, expect, it } from "vitest";
import { demoSeed } from "./product.seed";

describe("NEW CETRiS demo seed", () => {
  it("keeps four neutral variants and the supplied offer", () => {
    expect(demoSeed.variants).toHaveLength(4);
    expect(demoSeed.variants.map((variant) => variant.name)).toEqual([
      "Variant 01",
      "Variant 02",
      "Variant 03",
      "Variant 04",
    ]);
    expect(demoSeed.offer).toMatchObject({
      quantity: 2,
      price: 100,
      currency: "EGP",
      active: true,
    });
  });
  it("keeps WhatsApp unverified and Instagram unset", () => {
    expect(demoSeed.settings.whatsappNumber).toBe("+0201016264326");
    expect(demoSeed.settings.whatsappNumberNeedsVerification).toBe(true);
    expect(demoSeed.settings.instagram).toBe("");
  });
});
