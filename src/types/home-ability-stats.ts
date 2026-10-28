import type { FacilityId } from "./facility";
import type { AniimoNo } from "../enums/aniimos";
import type { FormId } from '../enums/forms';
import type { HomeAbilityId } from '../enums/home-abilities';

export interface HomeAbilityAniimoRef {
  no: AniimoNo;
  name: string;
  form_id: FormId;
  level: number;
}

export interface HomeAbilityFacilityRef {
  facility_id: FacilityId;
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