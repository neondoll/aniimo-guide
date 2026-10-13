import { FormIds } from '../enums/forms.enum.ts'

export type FormId = (typeof FormIds)[keyof typeof FormIds];

export interface Form {
  id: FormId;
  name: string;
}
