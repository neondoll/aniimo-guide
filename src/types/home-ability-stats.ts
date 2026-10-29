import type { AniimoNo } from '../enums/aniimos.ts'
import type { FormId } from '../enums/forms.ts';
import type { HomeAbilityId } from '../enums/home-abilities.ts';

export interface HomeAbilityAniimoRef {
  no: AniimoNo;
  name: string;
  form_id: FormId;
  level: number;
  element_colors: string[];
}

export interface HomeAbilityFacilityRef {
  facility_id: string;
  facility_name: string;
  copies: number;
  modes: Array<{ mode_id: string; mode_name: string; required_ability_level: number }>;
}

export interface HomeAbilityWithStats {
  id: HomeAbilityId;
  name: string;
  description?: string;
  color: string;
  aniimo_count: number;
  aniimos: HomeAbilityAniimoRef[];
  facility_count: number;
  facilities: HomeAbilityFacilityRef[];
}
