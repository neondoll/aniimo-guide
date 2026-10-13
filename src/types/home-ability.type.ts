import type { HomeAbilityIds } from '../enums/home-abilities.enum.ts'

export type HomeAbilityId = (typeof HomeAbilityIds)[keyof typeof HomeAbilityIds];

export interface HomeAbility {
  id: HomeAbilityId;
  name: string;
  description?: string;
  icon?: string;
}
