import type { AniimoFormId } from './aniimo-form.type'
import type { ElementId } from './element.type';

export interface Aniimo {
  no: string;
  name: string;
  form_id: AniimoFormId;
  element_ids: ElementId[];
}
