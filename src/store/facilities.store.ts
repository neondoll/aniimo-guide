import { createDataStore } from './createDataStore';
import type { Facility } from '../types/facility';

export const useFacilitiesStore = createDataStore<Facility[]>({
  name: 'facilities',
  url: 'data/facilities.json',
  initialData: [],
});
