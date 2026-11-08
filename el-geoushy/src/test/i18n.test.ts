import { describe, expect, it } from "vitest";
import { locales } from "@/shared/i18n";

/** Collects leaf string-key paths (function values count as leaves too). */
function leafPaths(node: unknown, prefix = ""): string[] {
  if (node === null || typeof node !== "object") return prefix ? [prefix] : [];
  return Object.entries(node as Record<string, unknown>).flatMap(([k, v]) =>
    leafPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("i18n dictionaries", () => {
  it("ar and en expose the same keys (parity test)", () => {
    expect(leafPaths(locales["ar"])).toEqual(leafPaths(locales["en"]));
  });

  it("every locale is registered", () => {
    expect(Object.keys(locales).sort()).toEqual(["ar", "en"]);
  });
});
