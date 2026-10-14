import type { AniimoNo } from "../enums/aniimos.ts";
import type { FormId } from "../enums/forms.ts";
import type { Personality } from "../types/personality";
import type { PersonalitySide, SideScores } from "../types/recommendations";

/**
 * Оценка того, насколько целевая форма хороша для характера:
 * суммируем уровни способностей, поддерживающих каждую заданную черту.
 * Штрафов нет — несовпадающие черты дают 0.
 */
export function scoreEvolution(p: Partial<Personality>, sideScores: SideScores): number {
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
}

export function rankBranches(
  personality: Partial<Personality>,
  branches: Array<{ to_no: AniimoNo; to_form_id: FormId; target_side_scores: SideScores }>,
): BranchScore[] {
  const scored = branches.map((b) => ({
    to_no: b.to_no,
    to_form_id: b.to_form_id,
    score: scoreEvolution(personality, b.target_side_scores),
    recommended: false,
  }));

  if (scored.length === 0) return scored;

  scored.sort((a, b) => b.score - a.score);

  // Топ может быть не один — все ветки с максимальным счётом помечаем рекомендованными.
  const top = scored[0].score;

  // Если топ равен 0 — значит ни одна из веток не даёт преимуществ
  // под выбранный характер. Ничего не подсвечиваем, чтобы не вводить в заблуждение.
  if (top > 0) {
    for (const s of scored) if (s.score === top) s.recommended = true;
  }

  return scored;
}
