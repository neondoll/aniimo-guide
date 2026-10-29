import type { PartialPersonality } from './personality.ts';
import type { ElementId } from '../enums/elements.ts';
import type { FormId } from '../enums/forms.ts';
import type { HomelandAbilityId } from '../enums/homeland-abilities.ts';
import type { RegionId } from '../enums/regions.ts'
import type { StageId } from '../enums/stages.ts';

export interface ElementAssignment {
  id: ElementId;
  level: number;
}

export interface HomelandAbilityAssignment {
  id: HomelandAbilityId;
  level: number;
}

export interface EvolutionEdge {
  to_no: string;
  to_form: FormId;
  to_region?: RegionId;
  requires_personality?: PartialPersonality;
}

export interface AniimoForm {
  stage?: StageId;
  form: FormId;
  region?: RegionId;
  elements: ElementAssignment[];
  home_abilities: HomelandAbilityAssignment[];
  fixed_personality?: PartialPersonality;
  evolves_to: EvolutionEdge[];
  is_final: boolean;
  season?: number;
  image?: string;
}

export interface Aniimo {
  region: RegionId;
  no: string;
  name: string;
  family_id: string;
  forms: AniimoForm[];
}
