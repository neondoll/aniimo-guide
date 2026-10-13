import { createDataStore } from './createDataStore';
import type { Form } from '../types/form.type';

export const useFormsStore = createDataStore<Form>({
  name: 'forms',
  url: 'data/forms.json',
});