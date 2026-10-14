import { computeFormTraits, computeFacilityMatches } from "./traits.ts";
import { computeUpgradeSuggestions } from "./upgrade.ts";
import type { Aniimo } from "../../src/types/aniimo.ts";
import type { Facility } from "../../src/types/facility.ts";
import type { Recommendations, FormRecommendation } from "../../src/types/recommendations.ts";

interface BuildArgs {
  aniimos: Aniimo[];
  facilities: Facility[];
  rareFormIds: Set<string>;
}

export function buildRecommendations({ aniimos, facilities, rareFormIds }: BuildArgs): Recommendations {
  const forms: Record<string, FormRecommendation> = {};

  // Первый проход — traits и facility_matches для всех форм
  for (const a of aniimos) {
    for (const form of a.forms) {
      const key = `${a.no}:${form.form_id}`;

      forms[key] = {
        no: a.no,
        name: a.name,
        form_id: form.form_id,
        is_final: form.is_final,
        is_rare: rareFormIds.has(form.form_id),
        traits: computeFormTraits(form, facilities, a.family_id),
        facility_matches: computeFacilityMatches(form, facilities, a.family_id),
        evolution_branches: [],
        upgrade_suggestions: [],
      };
    }
  }

  // Второй проход — ветки эволюции с портретами целевых форм
  for (const a of aniimos) {
    for (const form of a.forms) {
      if (form.is_final) continue;

      const key = `${a.no}:${form.form_id}`;

      forms[key].evolution_branches = form.evolves_to.map((edge) => {
        const targetKey = `${edge.to_no}:${edge.to_form_id}`;

        return { to_no: edge.to_no, to_form_id: edge.to_form_id, target_traits: forms[targetKey]?.traits ?? {} };
      });
    }
  }

  // Третий проход — upgrade-советы по всем формам
  computeUpgradeSuggestions(Object.values(forms));

  return { forms };
}