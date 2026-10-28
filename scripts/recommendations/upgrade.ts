import type { HomeAbilityId } from "../../src/enums/home-abilities.ts";
import type { FormRecommendation, UpgradeSuggestion } from "../../src/types/recommendations.ts";

export function computeUpgradeSuggestions(all: FormRecommendation[]): void {
  const byAbility = new Map<HomeAbilityId, Array<{ rec: FormRecommendation; maxLevel: number }>>();

  for (const rec of all) {
    const own = new Map<HomeAbilityId, number>();

    for (const c of rec.facility_matches) {
      for (const id of c.covered_ability_ids) {
        const level = Math.max(own.get(id) ?? 0, c.max_ability_level);
        own.set(id, level);
      }
    }

    for (const [abilityId, level] of own) {
      const list = byAbility.get(abilityId) ?? [];
      list.push({ rec, maxLevel: level });
      byAbility.set(abilityId, list);
    }
  }

  for (const rec of all) {
    const own = new Map<HomeAbilityId, { level: number; capped: boolean }>();

    for (const c of rec.facility_matches) {
      for (const id of c.covered_ability_ids) {
        const prev = own.get(id);
        own.set(id, {
          level: Math.max(prev?.level ?? 0, c.max_ability_level),
          capped: prev?.capped || c.is_speed_capped,
        });
      }
    }

    const suggestions: UpgradeSuggestion[] = [];

    for (const [abilityId, { level, capped }] of own) {
      if (capped) continue; // скорость уже максимальна — улучшать нечего

      const better = (byAbility.get(abilityId) ?? [])
        .filter((x) => x.maxLevel > level)
        .sort((a, b) => b.maxLevel - a.maxLevel || a.rec.no.localeCompare(b.rec.no));

      if (better.length === 0) continue;

      suggestions.push({
        ability_id: abilityId,
        current_level: level,
        better_forms: better.map((b) => ({
          no: b.rec.no,
          name: b.rec.name,
          form_id: b.rec.form_id,
          is_rare: b.rec.is_rare,
          level: b.maxLevel,
        })),
      });
    }

    rec.upgrade_suggestions = suggestions;
  }
}
