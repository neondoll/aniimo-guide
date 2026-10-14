import type { FormId } from "../enums/forms.ts";

export interface Form {
  id: FormId;
  name: string;
  is_rare?: boolean;
}
