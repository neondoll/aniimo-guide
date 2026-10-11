import { createDataStore } from './createDataStore';
import type { AniimoForm } from '../types/aniimo-form.type';

export const useAniimoFormsStore = createDataStore<AniimoForm>({
  name: 'aniimo-forms',
  url: 'data/aniimo-forms.json',
});