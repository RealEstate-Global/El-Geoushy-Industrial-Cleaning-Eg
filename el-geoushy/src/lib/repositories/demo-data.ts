import type { DemoData } from "@/types/site";
import { demoSeed } from "@/features/product/data/product.seed";
export interface SiteRepository {
  load(): DemoData;
  save(data: DemoData): void;
  reset(): DemoData;
}
const key = "new-cetris-demo-data-v1";
export const demoRepository: SiteRepository = {
  load() {
    if (typeof window === "undefined") return demoSeed;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? { ...demoSeed, ...(JSON.parse(raw) as Partial<DemoData>) } : demoSeed;
    } catch {
      return demoSeed;
    }
  },
  save(data) {
    if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(data));
  },
  reset() {
    if (typeof window !== "undefined") window.localStorage.removeItem(key);
    return demoSeed;
  },
};
