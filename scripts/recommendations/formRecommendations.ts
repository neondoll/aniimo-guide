import type { FamilyId } from "../../src/enums/families.ts";
import type { HomeAbilityId } from "../../src/enums/home-abilities.ts";
import type { AniimoForm } from "../../src/types/aniimo.ts";
import type { Facility, FacilityMode } from "../../src/types/facility.ts";
import type { FacilityCoverage } from "../../src/types/recommendations.ts";

// ...

export function buildFacilityMatches(
  form: AniimoForm,
  facility: Facility & { resolved_modes: FacilityMode[] },
  familyId: FamilyId,
): FacilityCoverage[] {
  if (facility.copies === 0) return [];
  if (
    facility.requires_families.length > 0 &&
    !facility.requires_families.includes(familyId)
  ) return [];

  const abilityMap = new Map(form.home_abilities.map((ha) => [ha.id, ha.level]));
  const coveredByMode = new Map<string, HomeAbilityId[]>();

  // Для каждого режима проверяем, какие способности достигают нужного уровня
  for (const mode of facility.resolved_modes) {
    const covered = facility.requires_abilities.filter(
      (id) => (abilityMap.get(id) ?? 0) >= mode.required_ability_level,
    );
    if (covered.length > 0) coveredByMode.set(mode.id, covered);
  }

  if (coveredByMode.size === 0) return [];

  // Собираем по одной записи FacilityCoverage на каждый покрытый режим
  return facility.resolved_modes
    .filter((m) => coveredByMode.has(m.id))
    .map((mode) => {
      const covered = coveredByMode.get(mode.id)!;
      return {
        facility_id: facility.id,
        facility_name: facility.name,
        copies: facility.copies,
        mode_id: mode.id,
        mode_name: mode.name,
        covered_ability_ids: covered,
        required_ability_level: mode.required_ability_level,
        max_ability_level: Math.max(...covered.map((id) => abilityMap.get(id) ?? 0)),
        is_speed_capped: facility.is_speed_capped ?? false,
        ...(facility.preferred_personality ? { preferred_personality: facility.preferred_personality } : {}),
        ...(facility.requires_families.length > 0 ? { family_match: familyId } : {}),
      };
    });
}