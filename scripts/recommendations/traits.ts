import type { FamilyId } from "../../src/enums/families.ts";
import type { AniimoForm } from "../../src/types/aniimo.ts";
import type { Facility } from "../../src/types/facility.ts";
import type { Axis, FacilityMatch, FormTraitProfile, Priority } from "../../src/types/recommendations.ts";

const AXIS_SIDES: Record<Axis, [string, string]> = { EI: ["E", "I"], SN: ["S", "N"], TF: ["T", "F"], JP: ["J", "P"] };

function passesFamilyFilter(f: Facility, familyId: FamilyId): boolean {
  return f.requires_families.length === 0 || f.requires_families.includes(familyId);
}

export function computeFormTraits(form: AniimoForm, facilities: Facility[], familyId: FamilyId): FormTraitProfile {
  const maxLevel = Math.max(0, ...form.home_abilities.map((ha) => ha.level));

  if (maxLevel === 0) return {};

  const votes: Record<Axis, Record<string, number>> = { EI: {}, SN: {}, TF: {}, JP: {} };

  for (const ha of form.home_abilities) {
    for (const f of facilities) {
      if (!f.requires_abilities.includes(ha.id)) continue;

      if (!passesFamilyFilter(f, familyId)) continue;

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

    if (l === r) {
      profile[axis] = [
        { side: left, priority: "medium" },
        { side: right, priority: "medium" },
      ];
    }
    else {
      const [winner, winLevel] = l > r ? [left, l] : [right, r];
      const priority: Priority = winLevel === maxLevel ? "high" : "low";
      profile[axis] = [{ side: winner, priority }];
    }
  }

  return profile;
}

export function computeFacilityMatches(form: AniimoForm, facilities: Facility[], familyId: FamilyId): FacilityMatch[] {
  const matches: FacilityMatch[] = [];

  for (const f of facilities) {
    if (f.requires_abilities.length === 0) continue;

    if (!passesFamilyFilter(f, familyId)) continue;

    const covers = form.home_abilities
      .filter((ha) => f.requires_abilities.includes(ha.id))
      .map((ha) => ({ ability_id: ha.id, level: ha.level }));

    if (covers.length === 0) continue;

    matches.push({
      facility_id: f.id,
      facility_name: f.name,
      covers,
      ...(f.preferred_personality ? { preferred_personality: f.preferred_personality } : {}),
    });
  }

  matches.sort((x, y) => x.facility_name.localeCompare(y.facility_name));

  return matches;
}
