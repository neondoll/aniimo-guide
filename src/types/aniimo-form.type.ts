import { AniimoFormIds } from '../enums/aniimo-forms.enum'

export type AniimoFormId = (typeof AniimoFormIds)[keyof typeof AniimoFormIds];

export interface AniimoForm {
  id: AniimoFormId;
  name: string;
}
