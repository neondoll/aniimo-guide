import type { PartialPersonality } from './personality.ts';
import type { ElementId } from '../enums/elements.ts'
import type { FormId } from '../enums/forms.ts';
import type { HomelandAbilityId } from '../enums/homeland-abilities.ts';
import type { RegionId } from '../enums/regions.ts'
import type { StageId } from '../enums/stages.ts';

export type Priority = 'high' | 'medium' | 'low';
export type Axis = 'EI' | 'SN' | 'TF' | 'JP';
export type PersonalitySide = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface TraitVote {
  side: string;
  priority: Priority;
}

export type FormTraitProfile = Partial<Record<Axis, TraitVote[]>>;
export type SideScores = Partial<Record<PersonalitySide, number>>;

export interface FacilityCoverage {
  facility_id: string;
  facility_name: string;
  copies: number;
  mode_id: string;
  mode_name: string;
  covered_ability_ids: Array<ElementId | HomelandAbilityId>;
  required_ability_level: number;
  max_ability_level: number;
  is_speed_capped: boolean;
  preferred_personality?: PartialPersonality;
  family_match?: string;
}

export interface EvolutionBranch {
  to_no: string;
  to_form: FormId;
  to_region?: RegionId;
  target_traits: FormTraitProfile;
  target_side_scores: SideScores;
  requires_personality?: PartialPersonality;
}

export interface UpgradeSuggestion {
  ability_id: HomelandAbilityId;
  current_level: number;
  better_forms: Array<{ region: RegionId; no: string; name: string; form: FormId; is_rare: boolean; level: number }>;
}

export interface FormRecommendation {
  form_key: string;
  region: RegionId;
  no: string;
  name: string;
  form: FormId;
  family_id: string;
  is_final: boolean;
  is_rare: boolean;
  season?: number;
  stage?: StageId;
  image?: string;
  fixed_personality?: PartialPersonality;
  traits: FormTraitProfile;
  side_scores: SideScores;
  facility_matches: FacilityCoverage[];
  evolution_branches: EvolutionBranch[];
  upgrade_suggestions: UpgradeSuggestion[];
}

export interface Recommendations {
  forms: Record<string, FormRecommendation>;
}
