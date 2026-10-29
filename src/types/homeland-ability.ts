import type { HomelandAbilityId } from '../enums/homeland-abilities.ts';

export interface HomelandAbility {
  id: HomelandAbilityId;
  name: string;
  description?: string;
  color: string;
}
