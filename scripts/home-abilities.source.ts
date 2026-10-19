import { elements } from "./elements.source.ts";
import { HomeAbilityIds } from "../src/enums/home-abilities.ts";
import type { HomeAbility } from "../src/types/home-ability.ts";

export const homeAbilities: HomeAbility[] = [
  ...elements,
  { id: HomeAbilityIds.Artisanship, name: "Ремесло" },
  { id: HomeAbilityIds.Hauling, name: "Нести" },
  { id: HomeAbilityIds.Leisure, name: "Досуг" },
  { id: HomeAbilityIds.Perfumery, name: "Парфюмерия" },
];
