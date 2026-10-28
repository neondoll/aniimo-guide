import type { HomeAbilityId } from '../../src/enums/home-abilities.ts';
import type { Aniimo, AniimoForm } from '../../src/types/aniimo.ts';
import type { Facility, FacilityMode } from '../../src/types/facility.ts';
import type {
  FacilityCoverage, FormRecommendation, FormTraitProfile, PersonalitySide, SideScores, UpgradeSuggestion,
} from '../../src/types/recommendations.ts';
import type { FamilyId } from '../../src/enums/families.ts'

// --- Логика расчета черт характера ---
type Axis = 'EI' | 'SN' | 'TF' | 'JP';
const AXIS_SIDES: Record<Axis, [string, string]> = { EI: ['E', 'I'], SN: ['S', 'N'], TF: ['T', 'F'], JP: ['J', 'P'] };

function computeFormTraits(form: AniimoForm, facilities: Facility[]): FormTraitProfile {
  const maxLevel = Math.max(0, ...form.home_abilities.map((ha) => ha.level));

  if (maxLevel === 0) return {};

  const votes: Record<Axis, Record<string, number>> = { EI: {}, SN: {}, TF: {}, JP: {} };

  for (const ha of form.home_abilities) {
    for (const f of facilities) {
      if (!f.requires_abilities.includes(ha.id)) continue;

      if (!f.preferred_personality) continue;

      for (const axis of Object.keys(AXIS_SIDES) as Axis[]) {
        const side = f.preferred_personality[axis];

        if (!side) continue;

        votes[axis][side] = Math.max(votes[axis][side] ?? 0, ha.level);
      }
    }
  }

  const profile: FormTraitProfile = {};

  for (const axis of Object.keys(AXIS_SIDES) as Axis[]) {
    const [left, right] = AXIS_SIDES[axis];
    const l = votes[axis][left] ?? 0;
    const r = votes[axis][right] ?? 0;

    if (l === 0 && r === 0) continue;

    const list: { side: string; priority: 'high' | 'low' }[] = [];

    if (l > 0) list.push({ side: left, priority: l === maxLevel ? 'high' : 'low' });

    if (r > 0) list.push({ side: right, priority: r === maxLevel ? 'high' : 'low' });

    profile[axis] = list;
  }
  return profile;
}

function computeSideScores(form: AniimoForm, facilities: Facility[]): SideScores {
  const scores: SideScores = {};

  for (const ha of form.home_abilities) {
    for (const f of facilities) {
      if (!f.requires_abilities.includes(ha.id)) continue;

      if (!f.preferred_personality) continue;

      for (const side of Object.values(f.preferred_personality)) {
        if (!side) continue;

        const key = side as PersonalitySide;

        if ((scores[key] ?? 0) < ha.level) scores[key] = ha.level;
      }
    }
  }

  return scores;
}

// --- Логика подбора строений ---
function normalizeModes(f: Facility): FacilityMode[] {
  if (f.modes && f.modes.length > 0) return f.modes;

  // Если режимов нет, считаем дефолтный с уровнем 1 (или 0, если способности не требуются)
  return [{ id: 'default', name: 'По умолчанию', required_ability_level: f.requires_abilities.length > 0 ? 1 : 0 }];
}

function buildFacilityMatches(form: AniimoForm, facilities: Facility[], familyId: FamilyId): FacilityCoverage[] {
  const matches: FacilityCoverage[] = [];
  const abilityMap = new Map(form.home_abilities.map((ha) => [ha.id, ha.level]));

  for (const f of facilities) {
    if (f.copies === 0 || f.requires_abilities.length === 0) continue;

    if (f.requires_families.length > 0 && !f.requires_families.includes(familyId)) continue;

    const modes = normalizeModes(f);

    for (const mode of modes) {
      const covered = f.requires_abilities.filter(
        (id) => (abilityMap.get(id) ?? 0) >= mode.required_ability_level,
      );

      if (covered.length === 0) continue;

      matches.push({
        facility_id: f.id,
        facility_name: f.name,
        copies: f.copies,
        mode_id: mode.id,
        mode_name: mode.name,
        covered_ability_ids: covered,
        required_ability_level: mode.required_ability_level,
        max_ability_level: Math.max(...covered.map((id) => abilityMap.get(id) ?? 0)),
        is_speed_capped: f.is_speed_capped ?? false,
        ...(f.preferred_personality ? { preferred_personality: f.preferred_personality } : {}),
        ...(f.requires_families.length > 0 ? { family_match: familyId } : {}),
      });
    }
  }

  matches.sort((a, b) => a.facility_name.localeCompare(b.facility_name) || a.mode_name.localeCompare(b.mode_name));

  return matches;
}

function computeUpgradeSuggestions(all: FormRecommendation[]): void {
  const byAbility = new Map<string, Array<{ rec: FormRecommendation; maxLevel: number }>>();

  for (const rec of all) {
    const own = new Map<HomeAbilityId, number>();

    for (const c of rec.facility_matches) {
      for (const id of c.covered_ability_ids) {
        own.set(id, Math.max(own.get(id) ?? 0, c.max_ability_level));
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
      if (capped) continue;

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

// --- Главный экспорт ---
export function computeRecommendations(
  aniimos: Aniimo[],
  facilities: Facility[],
  rareFormIds: Set<string>,
): Record<string, FormRecommendation> {
  const forms: Record<string, FormRecommendation> = {};

  for (const a of aniimos) {
    for (const form of a.forms) {
      const key = `${a.no}:${form.form_id}`;
      const isRare = rareFormIds.has(form.form_id) || form.season !== undefined;

      forms[key] = {
        form_key: key,
        no: a.no,
        name: a.name,
        form_id: form.form_id,
        family_id: a.family_id,
        is_final: form.is_final,
        is_rare: isRare,
        ...(form.season !== undefined ? { season: form.season } : {}),
        ...(form.stage ? { stage: form.stage } : {}),
        ...(form.image ? { image: form.image } : {}),
        ...(form.fixed_personality ? { fixed_personality: form.fixed_personality } : {}),
        traits: computeFormTraits(form, facilities),
        side_scores: computeSideScores(form, facilities),
        facility_matches: buildFacilityMatches(form, facilities, a.family_id),
        evolution_branches: [],
        upgrade_suggestions: [],
      };
    }
  }

  // Ветки эволюции
  for (const a of aniimos) {
    for (const form of a.forms) {
      if (form.is_final) continue;

      const key = `${a.no}:${form.form_id}`;

      forms[key].evolution_branches = form.evolves_to.map((edge) => {
        const target = forms[`${edge.to_no}:${edge.to_form_id}`];
        return {
          to_no: edge.to_no,
          to_form_id: edge.to_form_id,
          target_traits: target?.traits ?? {},
          target_side_scores: target?.side_scores ?? {},
          ...(edge.requires_personality ? { requires_personality: edge.requires_personality } : {}),
        };
      });
    }
  }

  computeUpgradeSuggestions(Object.values(forms));

  return forms;
}
