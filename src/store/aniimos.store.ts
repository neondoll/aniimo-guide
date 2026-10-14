import { createDataStore } from "./createDataStore";
import type { Aniimo } from "../types/aniimo";

export const useAniimosStore = createDataStore<Aniimo[]>({
  name: "aniimos",
  url: "data/aniimos.json",
  initialData: [],
});
