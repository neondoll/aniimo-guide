export const StageIds = { Lumin: 'lumin', Gamma: 'gamma', Nova: 'nova', Legendary: 'legendary' } as const;

export type StageId = (typeof StageIds)[keyof typeof StageIds];

export const STAGE_LABELS: Record<StageId, string> = {
  [StageIds.Lumin]: 'Стадия люмина',
  [StageIds.Gamma]: 'Стадия гаммы',
  [StageIds.Nova]: 'Стадия новы',
  [StageIds.Legendary]: 'Легендарн.',
};
