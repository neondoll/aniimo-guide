import type { PartialPersonality } from './personality.ts';
import type { FamilyId } from '../enums/families.ts'
import type { HomeAbilityId } from '../enums/home-abilities.ts';

export type FacilityCategory =
  | 'material_production'
  | 'material_processing'
  | 'item_production'
  | 'utility'
  | 'aniimo_objects';

export interface FacilityMode {
  id: string;
  name: string;
  required_ability_level: number;
}

export interface Facility {
  id: string;
  name: string;
  description?: string;
  category: FacilityCategory;
  copies: number;
  requires_abilities: HomeAbilityId[];
  requires_families: FamilyId[];
  preferred_personality?: PartialPersonality;
  modes?: FacilityMode[];
  is_speed_capped?: boolean;
}
