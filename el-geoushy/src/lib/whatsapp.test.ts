import { describe, expect, it } from "vitest";
import {
  getVerifiedWhatsAppUrl,
  formatWhatsAppNumber,
  getWhatsAppChatUrl,
} from "./whatsapp";

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

describe("getWhatsAppChatUrl", () => {
  it("formats owner Egyptian number +0201016264326 correctly for wa.me", () => {
    expect(formatWhatsAppNumber("+0201016264326")).toBe("201016264326");
    expect(getWhatsAppChatUrl("+0201016264326")).toBe("https://wa.me/201016264326");
  });
  it("supports prefilled messages", () => {
    expect(getWhatsAppChatUrl("+0201016264326", "مرحباً")).toBe(
      "https://wa.me/201016264326?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B",
    );
  });
});
