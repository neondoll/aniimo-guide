import { createDataStore } from './createDataStore';
import type { HomelandAbilityWithStats } from '../types/homeland-ability-stats';

export const useHomelandAbilitiesStore = createDataStore<HomelandAbilityWithStats[]>({
  name: 'homeland-abilities',
  url: 'data/homeland-abilities.json',
  initialData: [],
});
