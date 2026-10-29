import type { AniimoNo } from '../enums/aniimos.ts'
import type { ElementId } from '../enums/elements.ts';
import type { FormId } from '../enums/forms.ts';

export interface ElementAniimoRef {
  no: AniimoNo;
  name: string;
  form_id: FormId;
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
