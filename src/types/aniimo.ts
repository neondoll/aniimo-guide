import type { PartialPersonality } from "./personality.ts";
import type { AniimoNo } from "../enums/aniimos.ts";
import type { ElementId } from "../enums/elements.ts";
import type { FamilyId } from "../enums/families.ts";
import type { FormId } from "../enums/forms.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

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
  element_ids: ElementId[];
  home_abilities: HomeAbilityAssignment[];
  evolves_to: EvolutionEdge[];
  is_final: boolean;
  image?: string;
  /** Номер сезона, если форма сезонная. Например, 1 для «Сувениров 1-го сезона». */
  season?: number;
}

export interface Aniimo {
  no: AniimoNo;
  name: string;
  family_id: FamilyId;
  forms: AniimoForm[];
}
