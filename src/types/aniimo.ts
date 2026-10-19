import type { PartialPersonality } from "./personality.ts";
import type { AniimoNo } from "../enums/aniimos.ts";
import type { ElementId } from "../enums/elements.ts";
import type { FamilyId } from "../enums/families.ts";
import type { FormId } from "../enums/forms.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

export interface Aniimo {
  no: AniimoNo;
  name: string;
  family_id: FamilyId;
  forms: AniimoForm[];
}

export interface AniimoForm {
  form_id: FormId;
  element_ids: ElementId[];
  home_abilities: HomeAbilityAssignment[];
  fixed_personality?: PartialPersonality;
  evolves_to: EvolutionEdge[];
  is_final: boolean;
  season?: number;
  image?: string;
  unique_group?: string;  // 'starter' | 'shop_ritmos' | undefined
}

export interface EvolutionEdge {
  to_no: AniimoNo;
  to_form_id: FormId;
  requires_personality?: PartialPersonality;
}

export interface HomeAbilityAssignment {
  id: HomeAbilityId;
  level: number;
}
