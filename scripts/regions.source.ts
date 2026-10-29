import { RegionIds } from '../src/enums/regions.ts';
import type { Region } from '../src/types/region.ts';

export const regions: Region[] = [
  { id: RegionIds.WindyPlains, name: 'Ветреные равнины', order: 1 },
  { id: RegionIds.WhisperIslands, name: 'Острова Шепотков', order: 2 },
  { id: RegionIds.Seasonal, name: 'Сувениры 1-го сезона', order: 3 },
  { id: RegionIds.Starter, name: 'Стартовые анимо', order: 4 },
];
