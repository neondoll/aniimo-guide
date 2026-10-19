import type { PartialPersonality } from "./personality.ts";
import type { FacilityCategory } from "../enums/facilities.ts";
import type { FamilyId } from "../enums/families.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

export type Dedication =
  | "dedicated"   // анимо закреплён, 1 на копию
  | "flexible"    // анимо переключается между строениями
  | "shared"      // анимо приходит и уходит
  | "none";       // анимо не нужен

export interface Facility {
  id: FacilityId;
  name: string;
  description?: string;
  category: FacilityCategory;
  requires_abilities: HomeAbilityId[];
  requires_families: FamilyId[];
  required_ability_level: number;
  preferred_personality?: PartialPersonality;
  is_speed_capped?: boolean;
  copies: number;
  dedication: Dedication;
  // image?: string;
}

export type FacilityId = string;
