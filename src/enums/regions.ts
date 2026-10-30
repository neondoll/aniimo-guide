export const RegionIds = {
  WindyPlains: 'windy_plains',
  WhisperIslands: 'whisper_islands',
  Seasonal: 'seasonal',
  Starter: 'starter',
} as const;

export type RegionId = (typeof RegionIds)[keyof typeof RegionIds];

export const REGION_LABELS: Record<RegionId, string> = {
  [RegionIds.WindyPlains]: 'Ветреные равнины',
  [RegionIds.WhisperIslands]: 'Острова Шепотков',
  [RegionIds.Seasonal]: 'Сувениры 1-го сезона',
  [RegionIds.Starter]: 'Стартовые анимо',
};
