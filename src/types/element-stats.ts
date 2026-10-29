import type { ElementId } from '../enums/elements.ts';
import type { FormId } from '../enums/forms.ts';
import type { RegionId } from '../enums/regions.ts'

export interface ElementAniimoRef {
  region: RegionId;
  no: string;
  name: string;
  form: FormId;
  level: number;
  element_colors: string[];
}

export interface ElementFacilityRef {
  facility_id: string;
  facility_name: string;
  copies: number;
  modes: Array<{ mode_id: string; mode_name: string; required_ability_level: number }>;
}

export interface ElementWithStats {
  id: ElementId;
  name: string;
  color: string;
  aniimo_count: number;
  aniimos: ElementAniimoRef[];
  facility_count: number;
  facilities: ElementFacilityRef[];
}
