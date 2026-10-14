import { createDataStore } from "./createDataStore";
import type { Recommendations } from "../types/recommendations";

export const useRecommendationsStore = createDataStore<Recommendations>({
  name: "recommendations",
  url: "data/recommendations.json",
  initialData: { forms: {} },
});
