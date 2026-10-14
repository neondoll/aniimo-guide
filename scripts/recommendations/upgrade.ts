import type { HomeAbilityId } from "../../src/enums/home-abilities.ts";
import type { FormRecommendation, UpgradeSuggestion } from "../../src/types/recommendations.ts";

interface Entry {
  rec: FormRecommendation;
  level: number;
}

export function computeUpgradeSuggestions(all: FormRecommendation[]): void {
  // ability_id → список (форма, уровень)
  const byAbility = new Map<HomeAbilityId, Entry[]>();

  for (const rec of all) {
    const ownMax = new Map<HomeAbilityId, number>(); // чтобы не учитывать одну форму дважды

    for (const fm of rec.facility_matches) {
      for (const c of fm.covers) {
        const prev = ownMax.get(c.ability_id) ?? 0;

        if (c.level > prev) ownMax.set(c.ability_id, c.level);
      }
    }

    for (const [abilityId, level] of ownMax) {
      const list = byAbility.get(abilityId) ?? [];
      list.push({ rec, level });
      byAbility.set(abilityId, list);
    }
  }

  for (const rec of all) {
    const suggestions: UpgradeSuggestion[] = [];
    const ownMax = new Map<HomeAbilityId, number>();

    for (const fm of rec.facility_matches) {
      for (const c of fm.covers) {
        const prev = ownMax.get(c.ability_id) ?? 0;

        if (c.level > prev) ownMax.set(c.ability_id, c.level);
      }
    }

    for (const [abilityId, level] of ownMax) {
      const better = (byAbility.get(abilityId) ?? [])
        .filter((x) => x.level > level)
        .sort(
          (a, b) =>
            b.level - a.level ||
            a.rec.no.localeCompare(b.rec.no) ||
            a.rec.form_id.localeCompare(b.rec.form_id),
        );

      if (better.length === 0) continue;

      suggestions.push({
        ability_id: abilityId as HomeAbilityId,
        current_level: level,
        better_forms: better.map((b) => ({
          no: b.rec.no,
          name: b.rec.name,
          form_id: b.rec.form_id,
          is_rare: b.rec.is_rare,
          level: b.level,
        })),
      });
    }

    rec.upgrade_suggestions = suggestions;
  }
}