import { createDataStore } from "./createDataStore";
import type { Form } from "../types/form";

export const useFormsStore = createDataStore<Form[]>({
  name: "forms",
  url: "data/forms.json",
  initialData: [],
});
