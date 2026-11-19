import { beforeEach, describe, expect, it } from "vitest";
import { demoRepository } from "./demo-data";

describe("demo repository", () => {
  beforeEach(() => window.localStorage.clear());

  it("persists editable browser-only values and resets to the seed", () => {
    const loaded = demoRepository.load();
    const edited = { ...loaded, product: { ...loaded.product, capacity: "2 liters" } };
    demoRepository.save(edited);
    expect(demoRepository.load().product.capacity).toBe("2 liters");
    expect(demoRepository.reset().product.capacity).toBe("1 liter");
    expect(window.localStorage.getItem("new-cetris-demo-data-v1")).toBeNull();
  });
});
