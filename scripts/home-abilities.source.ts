import { elements } from "./elements.source.ts";
import { HomeAbilityIds } from "../src/enums/home-abilities.ts";
import type { HomeAbility } from "../src/types/home-ability.ts";

const image = (value: string) => `images/home-abilities/${value}`;

export const homeAbilities: HomeAbility[] = [
  ...elements,
  { id: HomeAbilityIds.Artisanship, name: "Ремесло", icon: image("artisanship.webp") },
  { id: HomeAbilityIds.Hauling, name: "Нести", icon: image("hauling.webp") },
  { id: HomeAbilityIds.Leisure, name: "Досуг", icon: image("leisure.webp") },
  { id: HomeAbilityIds.Perfumery, name: "Парфюмерия", icon: image("perfumery.webp") },
];
