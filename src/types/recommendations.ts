import type { PartialPersonality } from "./personality.ts";
import type { AniimoNo } from "../enums/aniimos.ts";
import type { FormId } from "../enums/forms.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

export type Priority = "high" | "medium" | "low";
export type Axis = "EI" | "SN" | "TF" | "JP";
export type PersonalitySide = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

/** Максимальный уровень способности формы, поддерживающей эту букву. */
export type SideScores = Partial<Record<PersonalitySide, number>>;

export interface TraitVote {
  side: string;
  priority: Priority;
}

export type FormTraitProfile = Partial<Record<Axis, TraitVote[]>>;

export interface FacilityMatch {
  facility_id: string;
  facility_name: string;
  covers: Array<{ ability_id: HomeAbilityId; level: number }>;
  /** Есть, только если у строения задано предпочтение. */
  preferred_personality?: PartialPersonality;
}

export interface EvolutionBranch {
  to_no: AniimoNo;
  to_form_id: FormId;
  /** Профиль целевой формы — основа для рантайм-скора. */
  target_traits: FormTraitProfile;
  target_side_scores: SideScores;
}

export interface UpgradeSuggestion {
  ability_id: HomeAbilityId;
  current_level: number;
  better_forms: Array<{
    no: AniimoNo;
    name: string;
    form_id: FormId;
    is_rare: boolean;
    level: number;
  }>;
}

export interface FormRecommendation {
  no: AniimoNo;
  name: string;
  form_id: FormId;
  is_final: boolean;
  is_rare: boolean;
  season?: number;
  /** Профиль по характеру для этой формы. */
  traits: FormTraitProfile;
  side_scores: SideScores;
  /** Строения, на которых эта форма может работать. */
  facility_matches: FacilityMatch[];
  /** Для нефинальных — куда можно эволюционировать, с портретом целевой формы. */
  evolution_branches: EvolutionBranch[];
  upgrade_suggestions: UpgradeSuggestion[];
}

export interface Recommendations {
  /** Ключ — `${no}:${form_id}`. */
  forms: Record<string, FormRecommendation>;
}
