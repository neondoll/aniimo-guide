import type { PartialPersonality } from "./personality.ts";
import type { AniimoNo } from "../enums/aniimos.ts";
import type { ElementId } from "../enums/elements.ts";
import type { FamilyId } from "../enums/families.ts";
import type { FormId } from "../enums/forms.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";
import type { StageId } from "../enums/stages.ts";

export interface ElementAssignment {
  id: ElementId;
  level: number;
}

export interface HomeAbilityAssignment {
  id: HomeAbilityId;
  level: number;
}

export interface EvolutionEdge {
  to_no: AniimoNo;
  to_form_id: FormId;
  requires_personality?: PartialPersonality;
}

export interface AniimoForm {
  form_id: FormId;
  stage?: StageId;
  elements: ElementAssignment[];
  home_abilities: HomeAbilityAssignment[];
  fixed_personality?: PartialPersonality;
  evolves_to: EvolutionEdge[];
  is_final: boolean;
  season?: number;
  image?: string;
}

export interface Aniimo {
  no: AniimoNo;
  name: string;
  family_id: FamilyId;
  forms: AniimoForm[];
}
