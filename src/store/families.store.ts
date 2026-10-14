import { createDataStore } from "./createDataStore";
import type { Family } from "../types/family";

export const useFamiliesStore = createDataStore<Family[]>({
  name: "families",
  url: "data/families.json",
  initialData: [],
});
