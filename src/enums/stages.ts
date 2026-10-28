export const StageIds = { Lumin: 'lumin', Gamma: 'gamma', Nova: 'nova' } as const;

export type StageId = (typeof StageIds)[keyof typeof StageIds];

export const STAGE_LABELS: Record<StageId, string> = { lumin: 'Lumin', gamma: 'Gamma', nova: 'Nova' };
