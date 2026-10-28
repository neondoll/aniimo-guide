import { createDataStore } from "./createDataStore";
import type { HomeAbilityWithStats } from "../types/home-ability-stats";

export const useHomeAbilitiesStore = createDataStore<HomeAbilityWithStats[]>({
  name: "home-abilities",
  url: "data/home-abilities.json",
  initialData: [],
});