import { HomelandAbilityIds } from "../src/enums/homeland-abilities.ts";
import type { HomelandAbility } from "../src/types/homeland-ability.ts";

export const homelandAbilities: HomelandAbility[] = [
  { id: HomelandAbilityIds.Artisanship, name: "Ремесло", color: '#71b258' },
  { id: HomelandAbilityIds.Hauling, name: "Нести", color: '#6285cc' },
  { id: HomelandAbilityIds.Leisure, name: "Досуг", color: '#e77894' },
  { id: HomelandAbilityIds.Perfumery, name: "Парфюмерия", color: '#b579dc' },
];
