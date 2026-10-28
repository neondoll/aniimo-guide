import type { HomeAbilityId } from '../enums/home-abilities.ts';

export interface HomeAbility {
  id: HomeAbilityId;
  name: string;
  description?: string;
  color: string;
}
