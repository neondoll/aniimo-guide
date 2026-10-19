import { ElementIds, ElementOrder } from "./elements.ts";

export const HomeAbilityIds = {
  ...ElementIds,
  /* Ремесло */ Artisanship: "artisanship",
  /* Нести */ Hauling: "hauling",
  /* Досуг */ Leisure: "leisure",
  /* Парфюмерия */ Perfumery: "perfumery",
} as const;
export const HomeAbilityOrder: readonly HomeAbilityId[] = [
  ...ElementOrder,
  HomeAbilityIds.Hauling,      // Нести
  HomeAbilityIds.Artisanship,  // Ремесло
  HomeAbilityIds.Leisure,      // Досуг
  HomeAbilityIds.Perfumery,    // Парфюмерия
];

export type HomeAbilityId = (typeof HomeAbilityIds)[keyof typeof HomeAbilityIds];
