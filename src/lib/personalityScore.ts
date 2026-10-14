import type { AniimoNo } from "../enums/aniimos.ts";
import type { FormId } from "../enums/forms.ts";
import type { Personality } from "../types/personality";
import type { Axis, FormTraitProfile, Priority } from "../types/recommendations";

const AXIS_SIDES: Record<Axis, [string, string]> = { EI: ["E", "I"], SN: ["S", "N"], TF: ["T", "F"], JP: ["J", "P"] };

const WEIGHT: Record<Priority, number> = { high: 3, medium: 2, low: 1 };

export function scorePersonality(p: Partial<Personality>, traits: FormTraitProfile): number {
  let score = 0;

  for (const axis of Object.keys(AXIS_SIDES) as Axis[]) {
    const votes = traits[axis];

    if (!votes) continue;

    const actual = p[axis];

    if (!actual) continue;

    for (const v of votes) score += v.side === actual ? WEIGHT[v.priority] : -WEIGHT[v.priority];
  }

  return score;
}

export interface BranchScore {
  to_no: AniimoNo;
  to_form_id: FormId;
  score: number;
  recommended: boolean;
}

export function rankBranches(
  personality: Partial<Personality>,
  branches: Array<{ to_no: AniimoNo; to_form_id: FormId; target_traits: FormTraitProfile }>,
): BranchScore[] {
  const scored = branches.map((b) => ({
    to_no: b.to_no,
    to_form_id: b.to_form_id,
    score: scorePersonality(personality, b.target_traits),
    recommended: false,
  }));

  scored.sort((a, b) => b.score - a.score);

  if (scored[0]) scored[0].recommended = true;

  return scored;
}
