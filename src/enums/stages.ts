export const StageIds = {
  Lumin: 'lumin',
  Gamma: 'gamma',
  Nova: 'nova',
} as const;

export type StageId = (typeof StageIds)[keyof typeof StageIds];

export const STAGE_LABELS: Record<StageId, string> = {
  lumin: 'Lumin',
  gamma: 'Gamma',
  nova: 'Nova',
};

export const STAGE_FULL_LABELS: Record<StageId, string> = {
  lumin: 'Стадия Lumin',
  gamma: 'Стадия Gamma',
  nova: 'Стадия Nova',
};
