import type { ElementId } from './element.type.ts';
import type { FormId } from './form.type.ts'
import type { HomeAbilityId } from './home-ability.type.ts'

export interface AniimoHomeAbilityAssignment {
  id: HomeAbilityId;
  level: number;
}

export interface AniimoForm {
  form_id: FormId;
  element_ids: ElementId[];
  home_abilities: AniimoHomeAbilityAssignment[];
}

export interface Aniimo {
  no: string;
  name: string;
  forms: AniimoForm[];
}
