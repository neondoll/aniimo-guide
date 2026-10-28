import { createDataStore } from './createDataStore';
import type { ElementWithStats } from '../types/element-stats';

export const useElementsStore = createDataStore<ElementWithStats[]>({
  name: 'elements',
  url: 'data/elements.json',
  initialData: [],
});
