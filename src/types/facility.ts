import type { PartialPersonality } from './personality.ts';
import type { ElementId } from '../enums/elements.ts'
import type { HomelandAbilityId } from '../enums/homeland-abilities.ts';

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
  requires_abilities: Array<ElementId | HomelandAbilityId>;
  requires_families: string[];
  preferred_personality?: PartialPersonality;
  modes?: FacilityMode[];
  is_speed_capped?: boolean;
}
