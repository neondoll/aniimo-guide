import type { FormId } from '../enums/forms.ts';
import type { HomelandAbilityId } from '../enums/homeland-abilities.ts';
import type { RegionId } from '../enums/regions.ts'

export interface HomelandAbilityAniimoRef {
  region: RegionId;
  no: string;
  name: string;
  form: FormId;
  level: number;
  element_colors: string[];
}

export interface HomelandAbilityFacilityRef {
  facility_id: string;
  facility_name: string;
  copies: number;
  modes: Array<{ mode_id: string; mode_name: string; required_ability_level: number }>;
}

export interface HomelandAbilityWithStats {
  id: HomelandAbilityId;
  name: string;
  description?: string;
  color: string;
  aniimo_count: number;
  aniimos: HomelandAbilityAniimoRef[];
  facility_count: number;
  facilities: HomelandAbilityFacilityRef[];
}
