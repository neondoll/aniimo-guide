import type { PartialPersonality } from "./personality.ts";
import type { FacilityCategory } from "../enums/facilities.ts";
import type { FamilyId } from "../enums/families.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

export interface FacilityMode {
  id: string;
  name: string;
  /** Уровень способности, необходимый для 100% скорости в этом режиме. */
  required_ability_level: number;
}

export type FacilityId = string;

export interface Facility {
  id: FacilityId;
  name: string;
  description?: string;
  category: FacilityCategory;
  copies: number;
  requires_abilities: HomeAbilityId[];
  requires_families: FamilyId[];
  preferred_personality?: PartialPersonality;
  modes: FacilityMode[];
  is_speed_capped?: boolean;
}
