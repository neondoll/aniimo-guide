import { createDataStore } from "./createDataStore";
import type { HomeAbility } from "../types/home-ability";

export const useHomeAbilitiesStore = createDataStore<HomeAbility[]>({
  name: "home-abilities",
  url: "data/home-abilities.json",
  initialData: [],
});