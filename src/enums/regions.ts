export const RegionIds = {
  WindyPlains: 'windy_plains',
  WhisperIslands: 'whisper_islands',
  Seasonal: 'seasonal',
  Starter: 'starter',
} as const;

export type RegionId = (typeof RegionIds)[keyof typeof RegionIds];

export const REGION_LABELS: Record<RegionId, string> = {
  windy_plains: 'Ветреные равнины',
  whisper_islands: 'Острова Шепотков',
  seasonal: 'Сувениры 1-го сезона',
  starter: 'Стартовые анимо',
};
