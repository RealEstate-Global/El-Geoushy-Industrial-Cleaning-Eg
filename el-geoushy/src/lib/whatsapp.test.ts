import { describe, expect, it } from "vitest";
import { getVerifiedWhatsAppUrl } from "./whatsapp";

describe("getVerifiedWhatsAppUrl", () => {
  it("does not generate a link while the number needs verification", () => {
    expect(getVerifiedWhatsAppUrl("+12025550123", true)).toBeNull();
  });
  it("rejects the owner-provided unconfirmed number", () => {
    expect(getVerifiedWhatsAppUrl("+0201016264326", false)).toBeNull();
  });
  it("creates a link only for a verified international number", () => {
    expect(getVerifiedWhatsAppUrl("+12025550123", false)).toBe("https://wa.me/12025550123");
  });
});
