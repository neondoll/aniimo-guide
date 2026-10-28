import type { FacilityId } from "./facility";
import type { AniimoNo } from "../enums/aniimos";
import type { ElementId } from '../enums/elements';
import type { FormId } from '../enums/forms';

export interface ElementAniimoRef {
  no: AniimoNo;
  name: string;
  form_id: FormId;
  level: number;
}

export interface ElementFacilityRef {
  facility_id: FacilityId;
  facility_name: string;
  copies: number;
  modes: Array<{ mode_id: string; mode_name: string; required_ability_level: number }>;
}

export interface ElementWithStats {
  id: ElementId;
  name: string;
  color: string;
  /** Количество анимо-форм, у которых есть этот элемент. */
  aniimo_count: number;
  /** Список ссылок для детальной страницы. */
  aniimos: ElementAniimoRef[];
  /** Строения, где этот элемент фигурирует в способностях. */
  facility_count: number;
  facilities: ElementFacilityRef[];
}
