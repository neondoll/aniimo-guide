import { elements } from './elements.source.ts'
import { HomeAbilityIds } from "../src/enums/home-abilities.ts";
import type { HomeAbility } from "../src/types/home-ability.ts";

export const homeAbilities: HomeAbility[] = [
  ...elements,
  { id: HomeAbilityIds.Artisanship, name: "Ремесло", color: '#71b258' },
  { id: HomeAbilityIds.Hauling, name: "Нести", color: '#6285cc' },
  { id: HomeAbilityIds.Leisure, name: "Досуг", color: '#e77894' },
  { id: HomeAbilityIds.Perfumery, name: "Парфюмерия", color: '#b579dc' },
];
