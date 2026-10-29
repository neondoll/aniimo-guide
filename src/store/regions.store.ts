import { createDataStore } from './createDataStore';
import type { Region } from '../types/region';

export const useRegionsStore = createDataStore<Region[]>({
  name: 'regions',
  url: 'data/regions.json',
  initialData: [],
});
