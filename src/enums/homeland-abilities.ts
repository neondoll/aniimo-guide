export const HomelandAbilityIds = {
  /* Ремесло */ Artisanship: "artisanship",
  /* Нести */ Hauling: "hauling",
  /* Досуг */ Leisure: "leisure",
  /* Парфюмерия */ Perfumery: "perfumery",
} as const;

export type HomelandAbilityId = (typeof HomelandAbilityIds)[keyof typeof HomelandAbilityIds];
