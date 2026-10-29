import { ElementIds } from './elements.ts'

export const HomeAbilityIds = {
  ...ElementIds,
  /* Ремесло */ Artisanship: "artisanship",
  /* Нести */ Hauling: "hauling",
  /* Досуг */ Leisure: "leisure",
  /* Парфюмерия */ Perfumery: "perfumery",
} as const;

export type HomeAbilityId = (typeof HomeAbilityIds)[keyof typeof HomeAbilityIds];
