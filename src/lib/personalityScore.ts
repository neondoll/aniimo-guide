import type { PersonalitySide } from '../constants/personality-labels'
import type { AniimoNo } from "../enums/aniimos";
import type { FormId } from "../enums/forms";
import type { PartialPersonality, Personality } from "../types/personality";
import type { SideScores } from "../types/recommendations";

/**
 * Оценка того, насколько целевая форма хороша для характера:
 * суммируем уровни способностей, поддерживающих каждую заданную черту.
 * Штрафов нет — несовпадающие черты дают 0.
 */
export function scoreEvolution(p: PartialPersonality, sideScores: SideScores): number {
  let score = 0;

  for (const side of Object.values(p)) {
    if (!side) continue;

    score += sideScores[side as PersonalitySide] ?? 0;
  }

  return score;
}

export interface BranchScore {
  to_no: AniimoNo;
  to_form_id: FormId;
  score: number;
  recommended: boolean;
  /** Требования выполнены (или их нет вовсе). */
  available: boolean;
  /** Требования есть, но в характере не хватает нужных осей для проверки. */
  unknown: boolean;
  /** Для UI: показать «требует: …». */
  requires_personality?: PartialPersonality;
}

function checkRequirements(
  p: PartialPersonality,
  requires: PartialPersonality | undefined,
): { available: boolean; unknown: boolean } {
  if (!requires) return { available: true, unknown: false };

  let unknown = false;

  for (const [axis, side] of Object.entries(requires)) {
    if (!side) continue;

    const actual = p[axis as keyof Personality];

    if (!actual) {
      unknown = true;

      continue;
    }

    if (actual !== side) return { available: false, unknown: false };
  }

  return { available: !unknown, unknown };
}

export function rankBranches(
  personality: PartialPersonality,
  branches: Array<{
    to_no: AniimoNo;
    to_form_id: FormId;
    target_side_scores: SideScores;
    requires_personality?: PartialPersonality;
  }>,
): BranchScore[] {
  const scored: BranchScore[] = branches.map((b) => {
    const { available, unknown } = checkRequirements(personality, b.requires_personality);

    return {
      to_no: b.to_no,
      to_form_id: b.to_form_id,
      score: available ? scoreEvolution(personality, b.target_side_scores) : 0,
      recommended: false,
      available,
      unknown,
      ...(b.requires_personality ? { requires_personality: b.requires_personality } : {}),
    };
  });

  const candidates = scored.filter((b) => b.available);

  if (candidates.length === 0) return scored;

  candidates.sort((a, b) => b.score - a.score);

  const top = candidates[0].score;

  if (top > 0) {
    for (const s of candidates) if (s.score === top) s.recommended = true;
  }

  return scored;
}
